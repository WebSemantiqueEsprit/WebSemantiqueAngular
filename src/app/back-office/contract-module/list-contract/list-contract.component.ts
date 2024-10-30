import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractService, Contract } from 'src/app/service/contract.service'; // Import the Contract interface

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.css']
})
export class ListContractComponent implements OnInit {
  contracts: any[] = []; // Array to hold the list of contracts
  loading: boolean = true; // To manage loading state
  isModalOpen: boolean = false; // To manage modal visibility
  isEditing: boolean = false; // To check if we are editing an existing contract
  newContract: Contract = { contractName: '', hasCostContract: '', hasDuration: '' }; // Initialize with default values
  currentContractName: string; // To hold the name of the contract being edited
  searchTerm: string = '';
  minCost: number | undefined;
  maxCost: number | undefined;
  duration: string = '';

  constructor(private contractService: ContractService,private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchContracts();
  }

  fetchContracts(): void {
    this.contractService.getContracts().subscribe({
      next: (data) => {
        this.contracts = data.contracts; // Assign the contracts array
        this.loading = false; // Set loading to false once data is fetched
      },
      error: (err) => {
        console.error('Error fetching contracts', err);
        this.loading = false; // Set loading to false in case of error
      }
    });
  }

  // Method to open the modal for adding a new contract
  openAddModal(): void {
    this.isModalOpen = true;
    this.isEditing = false;
    this.newContract = { contractName: '', hasCostContract: '', hasDuration: '' }; // Reset for new contract
  }

  // Method to open the modal for updating an existing contract
  openEditModal(contract: Contract): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.newContract = { ...contract }; // Clone contract data to avoid two-way binding issues
    this.currentContractName = contract.contractName; // Store the contract name for updates
  }

  // Add contract
  addContract(): void {
    this.contractService.createContract(this.newContract).subscribe({
      next: (response) => {
        console.log('Contract added:', response);
        this.fetchContracts();
        this.closeModal();
        window.location.reload(); // Reload the page on error
      },
      error: (err) => {
        console.error('Error adding contract', err);
        this.closeModal();
        window.location.reload(); // Reload the page on error
      }
    });
  }

  // Update contract
  updateContract(): void {
    this.contractService.updateContract(this.currentContractName, this.newContract).subscribe({
      next: (response) => {
        console.log('Contract updated:', response);
        this.fetchContracts(); // Refresh the list of contracts
        this.closeModal();
        window.location.reload(); // Reload the page on error
      },
      error: (err) => {
        console.error('Error updating contract', err);
        this.closeModal(); // Close the modal even if there is an error
        window.location.reload(); // Reload the page on error
      }
    });
  }

  // Method to handle deleting a contract
  deleteContract(contractName: string): void {
    this.contractService.deleteContract(contractName).subscribe({
      next: (response) => {
        console.log('Contract deleted:', response);
        this.fetchContracts(); // Refresh the contract list
        window.location.reload(); // Reload the page on error
      },
      error: (err) => {
        console.error('Error deleting contract', err);
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
      this.updateContract();
    } else {
      this.addContract();
    }
  }
  searchContracts() {
    this.contractService.searchContracts(this.searchTerm, this.minCost, this.maxCost, this.duration)
      .subscribe((response: { contracts: Contract[] }) => {
        this.contracts = response.contracts; // Adjust based on your response structure
      }, error => {
        console.error('Error fetching contracts', error);
      });
  }
}
