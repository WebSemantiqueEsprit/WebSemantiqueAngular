import { Component, OnInit } from '@angular/core';
import { ConnsamationEnergieService } from "../../../service/connsamation-energie.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-consommation-energie-list',
  templateUrl: './consommation-energie-list.component.html',
  styleUrls: ['./consommation-energie-list.component.css']
})
export class ConsommationEnergieListComponent implements OnInit {
  Energy: any[] = []; // To store the energy consumption data
  newEnergy: any = { URI: '', Value: '', TimeFrame: '' }; // Object for the new energy entry
  editEnergy: any = null; // To store energy being edited
  isModalOpen = false; // Track the modal state*
  startDate: string = '';
  endDate: string = '';
  searchTerm: string = '';
  minValue: string = ''; // Added for min value input
  maxValue: string = ''; // Added for max value input


  startDATEC: string = '';
  endDATEC: string = '';

  constructor(private connsamationEnergieService: ConnsamationEnergieService) { }

  ngOnInit(): void {
    this.getallEnergie();
  }

  getallEnergie(): void {
    this.connsamationEnergieService.getEnergieConsumption().subscribe(
      (data) => {
        this.Energy = data.EnergyConsumption; // Update to match your service response
        console.log(data); // Debugging output
      },
      (error) => {
        console.error('Error fetching energy consumption data', error);
      }
    );
  }

  // Open modal to add a new energy entry
  addEnergy(): void {
    this.isModalOpen = true; // Open the modal
    this.newEnergy = { uri: '', value: '', timeFrame: '' }; // Reset the form
    this.editEnergy = null; // Reset edit energy
  }


  // Handle the submission of a new energy entry
  submitNewEnergy(): void {
    console.log(this.startDate +'           ' + this.endDate)
    if (this.startDate && this.endDate) {
      const formattedStartDate = formatDate(this.startDate, 'yyyy-MM-dd', 'en-US');
      const formattedEndDate = formatDate(this.endDate, 'yyyy-MM-dd', 'en-US');

      // Combine dates into "YYYY-MM-DD to YYYY-MM-DD" format
      this.newEnergy.timeFrame = `${formattedStartDate} to ${formattedEndDate}`;
    }


    console.log(this.newEnergy.timeFrame)
    this.connsamationEnergieService.addEnergieConsumption(this.newEnergy).subscribe(
      (response) => {
        console.log('Energy entry added successfully:', response);


        const energydata={
          uri : this.newEnergy.uri,
          value:this.newEnergy.value,
          timeFrame:this.newEnergy.timeFrame
        }

        console.log(energydata)
        this.Energy.push({ ...energydata });

        this.isModalOpen = false; // Close the modal
      },
      (error) => {
        console.error('Error adding energy entry:', error);
      }
    );
  }

  // Open modal for updating an existing energy entry
  // TypeScript Component Code

  updateEnergy(energy): void {
    // Split time frame to set start and end dates for easier editing
    const [start, end] = energy.TimeFrame.split(" to ");
    this.startDATEC = start.trim();
    this.endDATEC = end.trim();

    // Prepare newEnergy object with the current values for editing
    this.newEnergy = {
      URI: energy.URI,
      Value: energy.Value,
      TimeFrame: `${this.startDATEC} to ${this.endDATEC}`
    };

    console.log(this.newEnergy)
    // Set flags to indicate edit mode and open the modal
    this.editEnergy = true;
    this.isModalOpen = true;
  }

  submitUpdatedEnergy(): void {

    console.log("Value :", this.newEnergy.Value);
    console.log("Date  :", `${this.startDATEC} to ${this.endDATEC}`);
    const updatedEnergy = {
      value: this.newEnergy.Value, // Make sure `Value` is correct
      timeFrame: `${this.startDATEC} to ${this.endDATEC}`
    };

    console.log("Updated Energy Data:", updatedEnergy); // Verify updated data before sending

    this.connsamationEnergieService.updateEnergieConsumption(this.newEnergy.URI, updatedEnergy).subscribe(
      (response) => {
        console.log('Energy entry updated successfully:', response);
        const index = this.Energy.findIndex(e => e.URI === this.newEnergy.URI);
        if (index !== -1) {
          const EnergyData={
            URI: this.newEnergy.URI,
            Value:updatedEnergy.value,
            TimeFrame:updatedEnergy.timeFrame
          }
          this.Energy[index] = EnergyData;
        }
        this.closeModal();
      },
      (error) => {
        console.error('Error updating energy entry:', error);
      }
    );
  }



  searchEnergyEfficiency(): void {
    if (this.searchTerm) {
      this.connsamationEnergieService.searchEnergyEfficiency(this.searchTerm).subscribe(
        (data) => {
          this.Energy = data; // Update Energy with the search results
        },
        (error) => {
          console.error('Error searching energy efficiency data', error);
        }
      );
    } else {
      this.getallEnergie(); // If search term is empty, refresh the full list
    }
  }

  // Existing methods...

  // Function to handle the input change for the search
  onSearchInputChange(): void {
    this.searchEnergyEfficiency();
  }


  onMinValueChange(): void {
    this.filterEnergyEfficiency();
  }

  // Function to handle the change event for maximum value input
  onMaxValueChange(): void {
    this.filterEnergyEfficiency();
  }

  // Filter method based on min and max values
  filterEnergyEfficiency(): void {
    if (this.minValue && this.maxValue) {
      this.connsamationEnergieService.filterEnergyEfficiency(this.minValue, this.maxValue).subscribe(
        (data) => {
          this.Energy = data; // Assuming the API returns the filtered user list
        },
        (error) => {
          console.error('Error filtering energy efficiency data', error);
        }
      );
    } else {
      this.getallEnergie(); // Refresh the list if inputs are empty
    }
  }

  deleteEnergy(energy: any): void {
    this.connsamationEnergieService.deleteEnergieConsumption(energy.URI).subscribe(
      (response) => {
        console.log('Energy entry deleted successfully:', response);
        this.Energy = this.Energy.filter(e => e.URI !== energy.URI);
      },
      (error) => {
        console.error('Error deleting energy entry', error);
      }
    );
  }

  // Function to close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
