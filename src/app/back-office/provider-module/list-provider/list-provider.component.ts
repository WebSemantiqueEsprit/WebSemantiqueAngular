import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/service/provider.service';

// src/app/models/provider.model.ts
interface Provider {
  providerName: string;                 // Another name for the provider
  greenEnergyPercentage: number;     // Green energy percentage
}

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit {
  providers: any[] = []; // Array to hold the list of providers
  loading: boolean = true; // To manage loading state
  isModalOpen: boolean = false; // To manage modal visibility
  isEditing: boolean = false; // To check if we are editing an existing provider
  newProvider: Provider = { providerName: '', greenEnergyPercentage: 0 }; // Initialize with default values
  currentProviderName: string; // To hold the name of the provider being edited
  searchTerm: string = ''; // Variable to bind with search input

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.fetchProviders();
  }

  fetchProviders(): void {
    this.providerService.getAllProviders().subscribe({
      next: (data) => {
        this.providers = data.providers; // Correctly assigning the providers array
        this.loading = false; // Set loading to false once data is fetched
      },
      error: (err) => {
        console.error('Error fetching providers', err);
        this.loading = false; // Set loading to false in case of error
      }
    });
  }

  // Method to open the modal for adding a new provider
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.newProvider = { providerName: '', greenEnergyPercentage: 0 }; // Reset for new provider
  }




  // Method to open the modal for updating an existing provider
  openEditModal(provider: Provider): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.newProvider = { ...provider }; // Clone provider data to avoid two-way binding issues
    this.currentProviderName = provider.providerName; // Store the provider name for updates
  }

  // Add provider
  addProvider(): void {
    this.providerService.createProvider(this.newProvider).subscribe({
      next: (response) => {
        console.log('Provider added:', response);
        this.fetchProviders();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error adding provider', err);
      }
    });
  }

  // Update provider
  updateProvider(): void {
    this.providerService.updateProvider(this.currentProviderName, this.newProvider).subscribe({
      next: (response) => {
        console.log('Provider updated:', response);
        this.fetchProviders(); // Refresh the list of providers
        this.isModalOpen = false; // Close the modal
      },
      error: (err) => {
        console.error('Error updating provider', err);
        this.isModalOpen = false; // Close the modal
        window.location.reload(); // Reload the page on error
      }
    });
  }



  // Method to handle deleting a provider
  deleteProvider(providerName: string): void {
    this.providerService.deleteProvider(providerName).subscribe({
      next: (response) => {
        console.log('Provider deleted:', response);
        this.fetchProviders(); // Refresh the provider list
        window.location.reload(); // Reload the page on error

      },
      error: (err) => {
        console.error('Error deleting provider', err);
        window.location.reload(); // Reload the page on error

      }
    });
  }

  // Method to close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.isEditing) {
      this.updateProvider();
    } else {
      this.addProvider();
    }
  }
  searchProviders(): void {
    if (this.searchTerm.trim()) {
      this.providerService.searchProviders(this.searchTerm).subscribe({
        next: (data) => {
          this.providers = data.providers;
        },
        error: (err) => {
          console.error('Error searching providers', err);
        }
      });
    } else {
      this.fetchProviders(); // If search term is empty, fetch all providers
    }
  }
}
