import { Component, OnInit } from '@angular/core';
import { CarbonReductionStrategyService } from 'src/app/service/cabonreductionstrategy.service';

@Component({
  selector: 'app-cabonreductionstrategy-list',
  templateUrl: './cabonreductionstrategy-list.component.html',
  styleUrls: ['./cabonreductionstrategy-list.component.css']
})
export class CarbonReductionStrategyListComponent implements OnInit {
  strategies: any[] = []; // Array to hold the strategies
  currentStrategy = { reductionStrategyName: '', hasCost: '', hasImpactValue: '' }; // Object for new or updating strategy
  isModalOpen = false; // Flag to control modal visibility
  modalTitle = 'Ajouter une nouvelle stratégie'; // Modal title
  invalidStrategyName = false; // Flag for strategy name validity


  constructor(private carbonReductionStrategyService: CarbonReductionStrategyService) { }

  ngOnInit(): void {
    this.getAllStrategies(); // Fetch all strategies on initialization
  }

  // Method to get all carbon reduction strategies
  getAllStrategies(): void {
    this.carbonReductionStrategyService.getAllCarbonReductionStrategies().subscribe(
      (data) => {
        this.strategies = data.CarbonReductionStrategy; // Adjusting to access the correct property
        console.log(this.strategies); // Check if strategies are correctly set
      },
      (error) => {
        console.error('Error fetching strategies', error);
      }
    );
  }

  validateStrategyName(): void {
    const strategyNamePattern = /^[a-zA-Z0-9-_]+$/; // Regex pattern to allow alphanumeric characters, underscores and dashes
    this.invalidStrategyName = !strategyNamePattern.test(this.currentStrategy.reductionStrategyName);
  }


  // Method to open modal for adding or updating a strategy
  openModal(strategy?: any): void {
    this.isModalOpen = true; // Open the modal
    if (strategy) {
      this.currentStrategy = { ...strategy }; // Copy the strategy data for updating
      this.modalTitle = 'Modifier la stratégie'; // Update modal title
    } else {
      this.currentStrategy = { reductionStrategyName: '', hasCost: null, hasImpactValue: null }; // Reset for new strategy
      this.modalTitle = 'Ajouter une nouvelle stratégie'; // Reset modal title
    }
  }

  // Method to close modal
  closeModal(): void {
    this.isModalOpen = false; // Close the modal
  }

  // Add new strategy
  submitStrategy(): void {

    this.validateStrategyName(); // Validate before submission
    if (this.invalidStrategyName) {
      return; // Prevent submission if invalid
    }


    if (this.currentStrategy.reductionStrategyName) {
      if (this.strategies.some(s => s.reductionStrategyName === this.currentStrategy.reductionStrategyName)) {
        // Update existing strategy
        const { reductionStrategyName, hasCost, hasImpactValue } = this.currentStrategy;
        const updatedData = { hasCost, hasImpactValue }; // Prepare the updated data object
        this.carbonReductionStrategyService.updateCarbonReductionStrategy(reductionStrategyName, updatedData).subscribe(
          (response) => {
            console.log('Strategy updated successfully!', response);
            this.getAllStrategies(); // Refresh the list
            this.closeModal(); // Close the modal
          },
          (error) => {
            console.error('Error updating strategy', error);
          }
        );
      } else {
        const addData = {
          reductionStrategyName: this.currentStrategy.reductionStrategyName,
          hasCost: this.currentStrategy.hasCost,
          hasImpactValue: this.currentStrategy.hasImpactValue,
        };
        console.log('Data being sent:', addData);

        // Add new strategy
        this.carbonReductionStrategyService.addCarbonReductionStrategy(addData).subscribe(
          (response) => {
            console.log('Strategy added successfully!', response);
            this.getAllStrategies();
            this.closeModal();
          },
          (error) => {
            console.error('Error adding strategy', error);
          }
        );
      }
    }
  }


  // Method to delete a carbon reduction strategy
  deleteStrategy(strategyName: string): void {
    this.carbonReductionStrategyService.deleteCarbonReductionStrategy(strategyName).subscribe(
      (response) => {
        console.log('Strategy deleted successfully!', response);
        this.getAllStrategies(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting strategy', error);
      }
    );
  }

  // Method to get the button label
  getButtonLabel(): string {
    return this.strategies.some(s => s.reductionStrategyName === this.currentStrategy.reductionStrategyName)
      ? 'Mettre à jour'
      : 'Ajouter';
  }
}
