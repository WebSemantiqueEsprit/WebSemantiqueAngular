import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarbonReductionStrategyService } from 'src/app/service/cabonreductionstrategy.service';
import { CarbonFootprintService } from 'src/app/service/carbonfootprint.service';

@Component({
  selector: 'app-carbonfootprint-list',
  templateUrl: './carbonfootprint-list.component.html',
  styleUrls: ['./carbonfootprint-list.component.css']
})
export class CarbonfootprintListComponent implements OnInit {
  carbonFootprints: any[] = []; // To store the carbon footprints
  displayedFootprints: any[] = []; // Footprints to be displayed on the current page
  newFootprint: any = { footprintName: '', carbonValue: '', type: '' }; // Object for the new footprint
  editFootprint: any = null; // To store footprint being edited
  isModalOpen = false; // Track the modal state
  invalidStrategyName = false; // Flag for strategy name validity
  searchValue: string = ''; // Nouvelle propriété pour stocker la valeur de recherche

  isFilterModalOpen = false; // État de la modale de filtre
  minCarbonValue: number | null = null; // Valeur minimale de filtrage
  maxCarbonValue: number | null = null; // Valeur maximale de filtrage

  currentPage: number = 1; // Track current page
  itemsPerPage: number = 6; // Items per page
  totalFootprints: number = 0; // Total number of footprints

  invalidCarbonValue: boolean = false; // Flag for carbon value validity
  invalidType: boolean = false; // Flag for type validity



  constructor(private carbonFootprintService: CarbonFootprintService, private cdr: ChangeDetectorRef, private carbonReductionStrategyService: CarbonReductionStrategyService) { }

  ngOnInit(): void {
    this.getallfootprint();
    this.getalldispoRelations();
    this.getAllStrategies();
  }



  validateCarbonValue(): void {
    this.invalidCarbonValue = !this.newFootprint.carbonValue || this.newFootprint.carbonValue <= 0;
  }

  validateType(): void {
    this.invalidType = !this.newFootprint.type || this.newFootprint.type.trim() === '';
  }

  getallfootprint(): void {
    // Fetch the carbon footprints on component initialization
    this.carbonFootprintService.getCarbonFootprints().subscribe(
      (data) => {
        this.carbonFootprints = data.carbonFootprints;
        this.totalFootprints = this.carbonFootprints.length; // Update total footprints
        this.updateDisplayedFootprints(); // Display first page
      },
      (error) => {
        console.error('Error fetching carbon footprints', error);
      }
    );
  }

  updateDisplayedFootprints(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedFootprints = this.carbonFootprints.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // New method to calculate total pages
  getTotalPages(): number {
    return Math.ceil(this.totalFootprints / this.itemsPerPage);
  }

  validateStrategyName(): void {
    const strategyNamePattern = /^[a-zA-Z0-9-_]+$/; // Regex pattern to allow alphanumeric characters, underscores and dashes
    this.invalidStrategyName = !strategyNamePattern.test(this.newFootprint.footprintName);
  }

  // Open modal to add a new footprint
  addFootprint(): void {
    this.isModalOpen = true; // Open the modal
    this.newFootprint = { footprintName: '', carbonValue: '', type: '' }; // Reset the form
    this.editFootprint = null; // Reset edit footprint
  }

  searchFootprint(): void {
    this.carbonFootprintService.searchCarbonFootprint(this.searchValue).subscribe(
      (data) => {
        this.carbonFootprints = data.carbonFootprints;
        this.totalFootprints = this.carbonFootprints.length; // Update total footprints after search
        this.currentPage = 1; // Reset to first page after search
        this.updateDisplayedFootprints(); // Update displayed footprints
      },
      (error) => {
        console.error('Erreur lors de la recherche', error);
      }
    );
  }

  // Handle the submission of a new footprint
  submitNewFootprint(): void {
    this.validateStrategyName(); // Validate before submission
    this.validateCarbonValue(); // Validate carbon value
    this.validateStrategyName(); // Validate before submission
    if (this.invalidStrategyName || this.invalidCarbonValue || this.invalidType) {
      return; // Prevent submission if any field is invalid
    }

    this.carbonFootprintService.addCarbonFootprint(this.newFootprint).subscribe(
      (response) => {
        console.log('Footprint added successfully:', response);
        const footprintdata = {
          footprintName: this.newFootprint.footprintName,
          hasCarbonValue: this.newFootprint.carbonValue,
          hasType: this.newFootprint.type
        };
        this.carbonFootprints.push({ ...footprintdata }); // Add to list without reload
        this.totalFootprints++; // Update total footprints
        this.updateDisplayedFootprints(); // Update displayed footprints
        this.isModalOpen = false; // Close the modal
      },
      (error) => {
        console.error('Error adding footprint:', error);
      }
    );
  }

  // Open modal for updating an existing footprint
  updateFootprint(footprint) {
    this.newFootprint = {
      footprintName: footprint.footprintName,
      carbonValue: footprint.hasCarbonValue,
      type: footprint.hasType,
    };
    this.editFootprint = true;
    this.isModalOpen = true; // Open modal
  }

  // Handle the submission of the updated footprint
  submitUpdatedFootprint(): void {

    this.validateStrategyName(); // Validate before submission
    this.validateCarbonValue(); // Validate carbon value
    this.validateType(); // Validate type

    if (this.invalidStrategyName || this.invalidCarbonValue || this.invalidType) {
      return; // Prevent submission if any field is invalid
    }

    const updatedFootprint = {
      footprintName: this.newFootprint.footprintName,
      carbonValue: this.newFootprint.carbonValue,
      type: this.newFootprint.type
    };

    this.carbonFootprintService.updateCarbonFootprint(updatedFootprint.footprintName, updatedFootprint).subscribe(
      (response) => {
        console.log('Footprint updated successfully:', response);
        // Find the footprint in the list and update it
        const index = this.carbonFootprints.findIndex(f => f.footprintName === updatedFootprint.footprintName);
        if (index !== -1) {
          const footprintdata = {
            footprintName: updatedFootprint.footprintName,
            hasCarbonValue: updatedFootprint.carbonValue,
            hasType: this.newFootprint.type
          };
          this.carbonFootprints[index] = footprintdata; // Update locally
          this.updateDisplayedFootprints(); // Update displayed footprints
          this.getallfootprint();
        }
        this.closeModal(); // Close the modal
      },
      (error) => {
        console.error('Error updating footprint:', error);
      }
    );
  }

  deleteFootprint(footprint: any): void {
    this.carbonFootprintService.deleteCarbonFootprint(footprint.footprintName).subscribe(
      (response) => {
        console.log(response); // Logs the success message
        this.carbonFootprints = this.carbonFootprints.filter(f => f.footprintName !== footprint.footprintName);
        this.totalFootprints--; // Update total footprints
        this.updateDisplayedFootprints(); // Update displayed footprints
      },
      (error) => {
        console.error('Error deleting footprint', error);
      }
    );
  }

  // Function to close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Méthodes pour ouvrir/fermer la modale
  openFilterModal(): void {
    this.isFilterModalOpen = true;
  }

  closeFilterModal(): void {
    this.isFilterModalOpen = false;
  }

  applyFilter(): void {
    this.carbonFootprintService.filterCarbonFootprint(this.minCarbonValue, this.maxCarbonValue).subscribe(
      (data) => {
        this.carbonFootprints = data.carbonFootprints;
        this.totalFootprints = this.carbonFootprints.length; // Update total footprints after filtering
        this.currentPage = 1; // Reset to first page after filtering
        this.updateDisplayedFootprints(); // Update displayed footprints

        this.closeFilterModal();
      },
      (error) => {
        console.error('Erreur lors du filtrage', error);
      }
    );
  }

  clearFilter(): void {
    this.minCarbonValue = null;
    this.maxCarbonValue = null;
    this.getallfootprint();
  }

  // Pagination Methods
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updateDisplayedFootprints(); // Update displayed footprints
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedFootprints(); // Update displayed footprints
    }
  }

  hasValidRelations(footprint: any): boolean {
    return footprint.relations.some(relation => relation.relation !== 'type');
  }

  //*********************code pour ajouter nouvelle relation************************//

  showModal = false; // Contrôle l'affichage de la modale

  strategies: any[] = [];

  footprintData: any = {}; // Changez cela pour être un objet, pas un tableau

  RelationsDispo: any[] = []; // To store the carbon footprints

  RelationNameInput: string = '';

  relationType: 'manual' | 'available' = 'manual'; // Type de relation sélectionné

  selectedRelation: string = '';
  selectedStrategy: string = ''; // Pour stocker la stratégie sélectionnée


  openAddRelationModal(footprint: any): void {
    this.showModal = true; // Affiche la modale
    this.footprintData = footprint;
    console.log(this.footprintData);
  }

  closeAddRelationModal(): void {
    this.showModal = false; // Ferme la modale
  }


  getalldispoRelations(): void {
    this.carbonFootprintService.getRelations().subscribe(
      (data) => {
        this.RelationsDispo = data.relations;
        console.log(this.RelationsDispo);
        this.cdr.detectChanges(); // Force la détection des changements
      },
      (error) => {
        console.error('Error fetching relations', error);
      }
    );
  }

  getAllStrategies(): void {
    this.carbonReductionStrategyService.getAllCarbonReductionStrategies().subscribe(
      (data) => {
        console.log(data); // Pour inspecter la structure des données
        if (data.CarbonReductionStrategy) {
          this.strategies = data.CarbonReductionStrategy.map(strategy => strategy.reductionStrategyName);
        } else {
          console.error('Aucune stratégie de réduction de carbone trouvée.');
        }
        console.log(this.strategies); // Vérifiez que les stratégies sont correctement définies
      },
      (error) => {
        console.error('Erreur lors de la récupération des stratégies', error);
      }
    );
  }

  async addRelationFinal(): Promise<void> {
    try {
      // Ajout d'une relation manuelle
      if (this.relationType === 'manual') {
        // Ajout de la relation
        await this.carbonFootprintService.addRelation(this.RelationNameInput).toPromise();
        console.log('Relation ajoutée avec succès:', this.RelationNameInput);

        // Ajout de l'instance de relation
        await this.carbonFootprintService.addInstanceWithRelation(
          this.footprintData.footprintName,
          this.selectedStrategy,
          this.footprintData.hasCarbonValue,
          this.footprintData.hasType,
          this.RelationNameInput
        ).toPromise();
        console.log('Instance de relation ajoutée avec succès');
      } else {
        // Ajout de l'instance de relation avec une relation sélectionnée
        await this.carbonFootprintService.addInstanceWithRelation(
          this.footprintData.footprintName,
          this.selectedStrategy,
          this.footprintData.hasCarbonValue,
          this.footprintData.hasType,
          this.selectedRelation // Utilisez selectedRelation ici
        ).toPromise();
        console.log('Instance de relation ajoutée avec succès');
      }
      this.getallfootprint();
      // Ferme la modale après le succès
      this.closeAddRelationModal();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la relation:', error);
    }
  }



}
