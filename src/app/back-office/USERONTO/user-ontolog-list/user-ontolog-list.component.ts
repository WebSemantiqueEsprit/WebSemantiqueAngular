import {Component, OnInit} from '@angular/core';
import { UserOntoService } from "../../../service/user-onto.service";

@Component({
  selector: 'app-user-ontolog-list',
  templateUrl: './user-ontolog-list.component.html',
  styleUrls: ['./user-ontolog-list.component.css']
})
export class UserOntologListComponent implements OnInit {
  users: any[] = []; // To store the user data
  newUser: any = { Name: '', Email: '', CarbonFootprintGoal: '' }; // Object for the new user entry
  editUser: any = null; // To store user being edited
  isModalOpen = false; // Track the modal state
  searchTerm: string = '';
  carbonFootprintGoal: string = '';


  constructor(private utilisateurService: UserOntoService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.utilisateurService.getUsers().subscribe(
      (data) => {
        this.users = data.Users; // Update to match your service response
        console.log(data); // Debugging output
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  // Open modal to add a new user
  addUser(): void {
    this.isModalOpen = true; // Open the modal
    this.newUser = { Name: '', Email: '', CarbonFootprintGoal: '' }; // Reset the form
    this.editUser = null; // Reset edit user
  }

  // Handle the submission of a new user entry
  submitNewUser(): void {
    const names = this.newUser.name.split(' ');
    this.newUser.uri = names[0];
    this.utilisateurService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('User entry added successfully:', response);


        const energydata={
          uri : this.newUser.uri,
          name:this.newUser.name,
          email:this.newUser.email,
          carbonFootprintGoal:this.newUser.carbonFootprintGoal
        }

        this.users.push({ ...energydata }); // Update locally
        this.isModalOpen = false; // Close the modal
      },
      (error) => {
        console.error('Error adding user entry:', error);
      }
    );
  }

  // Open modal for updating an existing user entry
  updateUser(user: any): void {
    this.newUser = { ...user };  // Copy the selected user's data to `newUser`
    this.editUser = true;        // Set the mode to 'edit'
    this.isModalOpen = true;     // Open the modal
  }


  // Handle the submission of the updated user entry
  submitUpdatedUser(): void {
    console.log(this.newUser )
    const updatedUser = {
      email: this.newUser.Email,
      carbonFootprintGoal: this.newUser.CarbonFootprintGoal,
      name:this.newUser.Name,
    };

    this.utilisateurService.updateUser(this.newUser.URI, updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Find the user entry in the list and update it
        const index = this.users.findIndex(u => u.URI === this.newUser.URI);
        if (index !== -1) {
          this.users[index] = {
            Email: updatedUser.email,
            Name:updatedUser.name,
            CarbonFootprintGoal:updatedUser.carbonFootprintGoal,
            URI:this.newUser.URI,
          }; // Update locally
        }
        this.closeModal(); // Close the modal
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }


  searchUser(): void {
    if (this.searchTerm) {
      this.utilisateurService.searchUser(this.searchTerm).subscribe(
        (data) => {
          this.users = data; // Update Energy with the search results
        },
        (error) => {
          console.error('Error searching energy efficiency data', error);
        }
      );
    } else {
      this.getAllUsers(); // If search term is empty, refresh the full list
    }
  }

  // Existing methods...

  // Function to handle the input change for the search
  onSearchInputChange(): void {
    this.searchUser();
  }

  onCarbonFootprintGoalChange(): void {
    this.utilisateurService.filterUser(this.carbonFootprintGoal).subscribe(
      (data) => {
        this.users = data; // Assuming the API returns the filtered user list
      },
      (error) => {
        console.error('Error filtering users', error);
      }
    );
  }

  // Delete a user entry
  deleteUser(user: any): void {
    this.utilisateurService.deleteUser(user.URI).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        this.users = this.users.filter(u => u.URI !== user.URI); // Remove user from the list
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  // Function to close the modal
  closeModal(): void {
    this.isModalOpen = false;
  }
}
