import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { EnergySourceService } from 'src/app/service/energy-source.service';

@Component({
  selector: 'app-energy-source-list',
  templateUrl: './energy-source-list.component.html',
  styleUrls: ['./energy-source-list.component.css']
})
export class EnergySourceListComponent implements OnInit {
  energySources: any[] = [];
  displayedEnergySources: any[] = [];
  newEnergySource: any = { energyType: '', renewablePercentage: null };
  editEnergySource: any = null;
  isModalOpen = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalEnergySources: number = 0;
  searchValue: string = '';
  minRenewablePercentage: string = '';
  maxRenewablePercentage: string = '';

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private energySourceService: EnergySourceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllEnergySources();

    // Configuration du délai pour la recherche
    this.searchSubject.pipe(
      debounceTime(300), // délai de 300 ms
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchEnergySources(value);
    });
  }

  getAllEnergySources(): void {
    this.energySourceService.getEnergySources().subscribe(
      (data) => {
        this.energySources = data.energySources;
        this.totalEnergySources = this.energySources.length;
        this.updateDisplayedEnergySources();
      },
      (error) => {
        console.error('Error fetching energy sources', error);
      }
    );
  }

  updateDisplayedEnergySources(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedEnergySources = this.energySources.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  searchEnergySources(searchValue: string): void {
    if (!searchValue) {
      this.getAllEnergySources();
      return;
    }

    this.energySourceService.searchEnergySourcesByType(searchValue).subscribe(
      (data) => {
        this.energySources = data.energySources || [];
        this.totalEnergySources = this.energySources.length;
        this.updateDisplayedEnergySources();
      },
      (error) => {
        console.error('Error searching energy sources', error);
      }
    );
  }

  addEnergySource(): void {
    this.isModalOpen = true;
    this.newEnergySource = { energyType: '', renewablePercentage: null };
    this.editEnergySource = null;
  }

  submitNewEnergySource(): void {
    this.energySourceService.addEnergySource(this.newEnergySource).subscribe(
      (response) => {
        console.log('Energy source added successfully:', response);
        this.energySources.push({ ...this.newEnergySource });
        this.totalEnergySources++;
        this.updateDisplayedEnergySources();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding energy source:', error);
      }
    );
  }

  updateEnergySource(source): void {
    this.newEnergySource = { ...source };
    this.editEnergySource = true;
    this.isModalOpen = true;
  }

  submitUpdatedEnergySource(): void {
    this.energySourceService.updateEnergySource(this.newEnergySource.energyType, this.newEnergySource).subscribe(
      (response) => {
        console.log('Energy source updated successfully:', response);
        const index = this.energySources.findIndex(s => s.energyType === this.newEnergySource.energyType);
        if (index !== -1) {
          this.energySources[index] = this.newEnergySource;
          this.updateDisplayedEnergySources();
        }
        this.closeModal();
      },
      (error) => {
        console.error('Error updating energy source:', error);
      }
    );
  }

  deleteEnergySource(source: any): void {
    this.energySourceService.deleteEnergySource(source.energyType).subscribe(
      (response) => {
        console.log(response);
        this.energySources = this.energySources.filter(s => s.energyType !== source.energyType);
        this.totalEnergySources--;
        this.updateDisplayedEnergySources();
        this.getAllEnergySources();
      },
      (error) => {
        console.error('Error deleting energy source', error);
      }
    );
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  filterByRenewablePercentageRange(): void {
    if (!this.minRenewablePercentage || !this.maxRenewablePercentage) {
      console.warn('Please provide both min and max renewable percentage.');
      return;
    }

    this.energySourceService.getEnergySourcesByRenewablePercentageRange(this.minRenewablePercentage, this.maxRenewablePercentage).subscribe(
      (data) => {
        if (data === "No energy sources found within the specified renewable percentage range.") {
          this.energySources = []; // Clear the list if no energy source found
        } else {
          this.energySources = data.energySources || [];
        }
        this.totalEnergySources = this.energySources.length;
        this.updateDisplayedEnergySources();
      },
      (error) => {
        console.error('Error fetching energy sources by renewable percentage range', error);
      }
    );
  }

  onMinRenewablePercentageChange(): void {
    this.filterByRenewablePercentageRange();
  }

  onMaxRenewablePercentageChange(): void {
    this.filterByRenewablePercentageRange();
  }
}
