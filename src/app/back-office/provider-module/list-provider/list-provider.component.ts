import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/service/provider.service';
// src/app/models/provider.model.ts
 interface Provider {
  hasNameProvider: string;              // Name of the provider
  providerName: string;                 // Another name for the provider
  hasGreenEnergyPercentage: string;     // Green energy percentage
}

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit {
  providers: Provider[] = []; // Array to hold the list of providers
  loading: boolean = true; // To manage loading state
  isModalOpen: boolean = false; // To manage modal visibility
  newProvider: Provider = { hasNameProvider: '', providerName: '', hasGreenEnergyPercentage: '' }; // To hold new provider data

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









}
