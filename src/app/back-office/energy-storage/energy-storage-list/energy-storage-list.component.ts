import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";

interface EnergyStorage {
  storageName: string;
  capacity: number;
  efficiency: number;
}

@Component({
  selector: 'app-energy-storage-list',
  templateUrl: './energy-storage-list.component.html',
  styleUrls: ['./energy-storage-list.component.css']
})
export class EnergyStorageListComponent implements OnInit {
  energyStorages: EnergyStorage[] = [];
  isModalOpen = false;
  editEnergyStorage: boolean = false;
  newEnergyStorage: EnergyStorage = { storageName: '', capacity: 0, efficiency: 0 };

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.loadEnergyStorages();
  }

  loadEnergyStorages() {
    this.http.get<{ energyStorages: any[] }>('http://localhost:8082/api/storage')
      .subscribe(response => {
        this.energyStorages = response.energyStorages.map(storage => ({
          storageName: storage.storageName,
          capacity: storage.properties.hasCapacity,
          efficiency: storage.properties.hasEfficiency
        }));
      });
  }

  openModal(storage?: EnergyStorage) {
    if (storage) {
      this.editEnergyStorage = true;
      this.newEnergyStorage = { ...storage };
    } else {
      this.editEnergyStorage = false;
      this.newEnergyStorage = { storageName: '', capacity: 0, efficiency: 0 };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitEnergyStorage() {
    if (this.editEnergyStorage) {
      this.updateEnergyStorage(this.newEnergyStorage);
    } else {
      this.addEnergyStorage(this.newEnergyStorage);
    }
    this.closeModal();
  }

  addEnergyStorage(storage: EnergyStorage) {
    this.http.post('http://localhost:8082/api/storage', {
      solutionName: storage.storageName,
      capacity: storage.capacity,
      efficiency: storage.efficiency
    }).subscribe(() => {
      this.loadEnergyStorages();
    });
  }

  // Update an existing energy storage
  updateEnergyStorage(storage: EnergyStorage) {
    this.http.put('http://localhost:8082/api/storage/update', {
      solutionName: storage.storageName,
      capacity: storage.capacity,
      efficiency: storage.efficiency
    }).subscribe(() => {
      this.loadEnergyStorages();
    });
  }

  // Delete an energy storage by name
  deleteEnergyStorage(storageName: string) {
    const confirmation = confirm(`Are you sure you want to delete the energy storage "${storageName}"?`);
    if (confirmation) {
      this.http.delete(`http://localhost:8082/api/storage/${storageName}`)
        .subscribe(() => {
          this.loadEnergyStorages();
        });
      this.router.navigateByUrl("/").then(() => {
        return this.router.navigateByUrl("/back/storage");
      });
    }
  }

}
