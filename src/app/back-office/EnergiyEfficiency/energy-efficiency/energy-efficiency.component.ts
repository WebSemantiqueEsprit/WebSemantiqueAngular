import { Component, OnInit } from '@angular/core';
import { EnergyEfficiencyService } from 'src/app/service/energy-efficiency.service';

@Component({
  selector: 'app-energy-efficiency',
  templateUrl: './energy-efficiency.component.html',
  styleUrls: ['./energy-efficiency.component.css']
})
export class EnergyEfficiencyComponent implements OnInit {
  efficiencies: any[] = [];
  newEfficiency = { efficiencyName: '', rating: '', savingsPotential: 0 };
  selectedEfficiency: any = null;
  searchEfficiencyName: string = '';
  filterRating: string = '';
  filterMinSavings: number = 0;

  showAddForm: boolean = false;
  showFilterForm: boolean = false;


  constructor(private energyEfficiencyService: EnergyEfficiencyService) {}

  ngOnInit(): void {
    this.loadEnergyEfficiencies();
  }

  loadEnergyEfficiencies(rating?: string, minSavings?: number, maxSavings?: number): void {
    this.energyEfficiencyService.getEnergyEfficiencies(rating, minSavings, maxSavings)
      .subscribe(data => {
        this.efficiencies = data.energyEfficiencies;
      }, error => {
        console.error("Error fetching energy efficiencies", error);
      });
  }

  // Bascule la visibilité du formulaire d'ajout
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
  toggleFilterForm(): void {
    this.showFilterForm = !this.showFilterForm;
  }

  // Create new efficiency
  addEnergyEfficiency(): void {
    if (!this.newEfficiency.efficiencyName || !this.newEfficiency.rating || this.newEfficiency.savingsPotential == null) {
      console.warn("All fields are required to add an efficiency.");
      return;
    }

    this.energyEfficiencyService.addEnergyEfficiency(this.newEfficiency)
      .subscribe(response => {
        console.log('Added:', response);
        this.loadEnergyEfficiencies();
        this.newEfficiency = { efficiencyName: '', rating: '', savingsPotential: 0 };
        this.showAddForm = false;
      }, error => {
        console.error("Error adding efficiency", error);
      });
  }


  // Update selected efficiency
  updateEnergyEfficiency(): void {
    if (!this.selectedEfficiency) return;

    console.log(this.selectedEfficiency.efficiencyName , this.selectedEfficiency.rating , this.selectedEfficiency.savingsPotential);
    this.energyEfficiencyService.updateEnergyEfficiency(
      this.selectedEfficiency.efficiencyName,
      {
        rating: this.selectedEfficiency.rating,
        savingsPotential: this.selectedEfficiency.savingsPotential
      }
    ).subscribe(response => {
      console.log('Updated:', response);
      this.loadEnergyEfficiencies(); // Reload list to reflect updates
      this.selectedEfficiency = null; // Clear form after update
    }, error => {
      console.error("Error updating efficiency", error);
    });
  }


  // Select efficiency for editing
  editEfficiency(efficiency: any): void {
    this.selectedEfficiency = { ...efficiency }; // Clone the object to avoid modifying original data
  }

  // Delete selected efficiency
  deleteEnergyEfficiency(efficiencyName: string): void {
    this.energyEfficiencyService.deleteEnergyEfficiency(efficiencyName)
      .subscribe(response => {
        console.log('Deleted:', response);
        this.loadEnergyEfficiencies();
      }, error => {
        console.error("Error deleting efficiency", error);
      });
  }
  searchEfficiency(efficiencyName: string): void {
    this.energyEfficiencyService.searchEnergyEfficiency(efficiencyName).subscribe(data => {
      this.efficiencies = data.energyEfficiencies;
    }, error => {
      console.error("Error fetching efficiency data", error);
    });
  }

  filterEfficiencies(rating: string, minSavingsPotential: number): void {
    this.energyEfficiencyService.filterEnergyEfficiencies(rating, minSavingsPotential).subscribe(data => {
      // Check if data has the expected structure
      if (data && Array.isArray(data.energyEfficiencies)) {
        this.efficiencies = data.energyEfficiencies;
        this.showFilterForm = false;
      } else {
        console.error('Unexpected response structure:', data);
        this.efficiencies = []; // Fallback to an empty array
      }
    });
  }
}
