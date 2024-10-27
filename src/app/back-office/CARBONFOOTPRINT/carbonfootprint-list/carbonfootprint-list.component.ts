// carbonfootprint-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CarbonFootprintService } from 'src/app/service/carbonfootprint.service';


@Component({
  selector: 'app-carbonfootprint-list',
  templateUrl: './carbonfootprint-list.component.html',
  styleUrls: ['./carbonfootprint-list.component.css']
})
export class CarbonfootprintListComponent implements OnInit {
  carbonFootprints: any[] = []; // To store the carbon footprints
  newFootprint: any = { footprintName: '', carbonValue: '', type: '' }; // Object for the new footprint
  editFootprint: any = null; // To store footprint being edited
  isModalOpen = false; // Track the modal state
  invalidStrategyName = false; // Flag for strategy name validity
  searchValue: string = ''; // Nouvelle propriété pour stocker la valeur de recherche

  constructor(private carbonFootprintService: CarbonFootprintService) { }

  ngOnInit(): void {
    this.getallfootprint();
  }

  getallfootprint(): void {
    // Fetch the carbon footprints on component initialization
    this.carbonFootprintService.getCarbonFootprints().subscribe(
      (data) => {
        this.carbonFootprints = data.carbonFootprints;
        console.log(this.carbonFootprints); // Debugging output
      },
      (error) => {
        console.error('Error fetching carbon footprints', error);
      }
    );
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
      },
      (error) => {
        console.error('Erreur lors de la recherche', error);
      }
    );
  }


  // Handle the submission of a new footprint
  submitNewFootprint(): void {

    this.validateStrategyName(); // Validate before submission
    if (this.invalidStrategyName) {
      return; // Prevent submission if invalid
    }


    this.carbonFootprintService.addCarbonFootprint(this.newFootprint).subscribe(
      (response) => {
        console.log('Footprint added successfully:', response);
        const footprintdata = {
          footprintName: this.newFootprint.footprintName,
          hasCarbonValue: this.newFootprint.carbonValue,
          hasType: this.newFootprint.type
        }
        this.carbonFootprints.push({ ...footprintdata }); // Add to list without reload
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
          }
          this.carbonFootprints[index] = footprintdata; // Update locally
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
}
