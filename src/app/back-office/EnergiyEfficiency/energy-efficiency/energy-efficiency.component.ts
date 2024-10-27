import { Component, OnInit } from '@angular/core';
import { EnergyEfficiencyService } from 'src/app/service/energy-efficiency.service';

@Component({
  selector: 'app-energy-efficiency',
  templateUrl: './energy-efficiency.component.html',
  styleUrls: ['./energy-efficiency.component.css']
})
export class EnergyEfficiencyComponent implements OnInit {
  efficiencies: any[] = [];
  newEfficiency = { efficiencyName: '', category: '', efficiencyValue: 0 };
  selectedEfficiency: any = null;
  searchEfficiencyName: string = ''; // Variable for search input
  filterRating: string = '';         // Variable for rating filter
  filterMinSavings: number = 0;
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

  // Create new efficiency
  addEnergyEfficiency(): void {
    this.energyEfficiencyService.addEnergyEfficiency(this.newEfficiency)
      .subscribe(response => {
        console.log('Added:', response);
        this.loadEnergyEfficiencies();
        this.newEfficiency = { efficiencyName: '', category: '', efficiencyValue: 0 }; // Reset form
      }, error => {
        console.error("Error adding efficiency", error);
      });
  }

  // Update selected efficiency
  updateEnergyEfficiency(): void {
    if (!this.selectedEfficiency) return;

    this.energyEfficiencyService.updateEnergyEfficiency(
      this.selectedEfficiency.efficiencyName,
      this.selectedEfficiency
    ).subscribe(response => {
      console.log('Updated:', response);
      this.loadEnergyEfficiencies();
      this.selectedEfficiency = null; // Clear selection
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
      this.efficiencies = data;

    });
  }

  filterEfficiencies(rating: string, minSavingsPotential: number): void {
    this.energyEfficiencyService.filterEnergyEfficiencies(rating, minSavingsPotential).subscribe(data => {
      this.efficiencies = data;
    });
  }
}
