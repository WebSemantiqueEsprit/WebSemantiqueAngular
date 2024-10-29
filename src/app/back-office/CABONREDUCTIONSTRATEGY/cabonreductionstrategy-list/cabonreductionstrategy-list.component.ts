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
  invalidCoutValue = false; // Flag for cost validity
  invalidImpactValue = false; // Flag for impact validity

  searchQuery: string = ''; // Variable to hold the search query

  // Filtering variables
  isFilterModalOpen = false; // Flag for filter modal
  minCost: number | null = null; // Minimum cost for filtering
  maxCost: number | null = null; // Maximum cost for filtering
  minImpact: number | null = null; // Minimum impact for filtering
  maxImpact: number | null = null; // Maximum impact for filtering
  selectedFilter: string = 'none'; // 'none', 'cost', or 'impact'

  // New filtering variables
  filterByImpact: boolean = false; // Flag for impact filtering
  filterByCost: boolean = false; // Flag for cost filtering



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
    this.validateStrategyName();
    this.validateCoutValue();
    this.validateImpactValue();

    if (this.invalidStrategyName || this.invalidCoutValue || this.invalidImpactValue) {
      return; // Stop submission if there are any validation errors
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

  // Method to search for a carbon reduction strategy by name
  searchStrategy(): void {
    if (this.searchQuery.trim()) {
      this.carbonReductionStrategyService.findCarbonReductionStrategyByName(this.searchQuery.trim()).subscribe(
        (data) => {
          if (data && data.reductionStrategyName) {
            this.strategies = [data]; // Set the strategies array to contain only the found strategy
          } else {
            this.strategies = []; // Clear strategies if not found
            console.error('Strategy not found');
          }
        },
        (error) => {
          console.error('Error searching strategy', error);
        }
      );
    } else {
      this.getAllStrategies(); // If the search query is empty, fetch all strategies
    }
  }

  // Method to open the filter modal
  openFilterModal(): void {
    this.isFilterModalOpen = true; // Open the filter modal
  }

  // Method to close the filter modal
  closeFilterModal(): void {
    this.isFilterModalOpen = false; // Close the filter modal
  }

  // Method to apply the filter
  applyFilter(): void {
    let filteredStrategies = this.strategies;

    // Apply cost filtering if applicable
    if (this.minCost !== null && this.maxCost !== null) {
      filteredStrategies = filteredStrategies.filter(strategy => {
        return strategy.hasCost >= this.minCost && strategy.hasCost <= this.maxCost;
      });
      this.filterByCost = true; // Set the filter flag
    } else {
      this.filterByCost = false; // Reset the filter flag
    }

    // Apply impact filtering if applicable
    if (this.minImpact !== null && this.maxImpact !== null) {
      filteredStrategies = filteredStrategies.filter(strategy => {
        return strategy.hasImpactValue >= this.minImpact && strategy.hasImpactValue <= this.maxImpact;
      });
      this.filterByImpact = true; // Set the filter flag
    } else {
      this.filterByImpact = false; // Reset the filter flag
    }

    this.strategies = filteredStrategies; // Update the displayed strategies
    this.closeFilterModal(); // Close the filter modal
  }
  // Method to reset filter
  resetFilter(): void {
    this.minCost = null;
    this.maxCost = null;
    this.minImpact = null;
    this.maxImpact = null;
    this.selectedFilter = 'none'; // Reset the selected filter to 'none'
    this.getAllStrategies(); // Fetch all strategies again to reset the view
  }


  // Nombre de stratégies par page
  itemsPerPage = 6
  currentPage = 1;

  // Calcul du nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.strategies.length / this.itemsPerPage);
  }

  // Obtenir les stratégies pour la page actuelle
  get paginatedStrategies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.strategies.slice(startIndex, endIndex);
  }

  // Méthodes pour changer de page
  goToPage(page: number): void {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }


  validateCoutValue(): void {
    // Validate that the cost is a positive number
    this.invalidCoutValue = !(this.currentStrategy.hasCost != null);
  }

  validateImpactValue(): void {
    // Validate that the impact value is a positive number
    this.invalidImpactValue = !(this.currentStrategy.hasImpactValue != null);
  }

}
