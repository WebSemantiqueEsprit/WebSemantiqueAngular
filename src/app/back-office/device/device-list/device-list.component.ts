import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  devices: any[] = [];
  displayedDevices: any[] = [];
  newDevice: any = { deviceName: '', powerRating: '', usageFrequency: '' };
  editDevice: any = null;
  isModalOpen = false;
  invalidDeviceName = false;

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalDevices: number = 0;
  searchValue: string = '';
  minPowerRating: string = '';
maxPowerRating: string = '';

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private deviceService: DeviceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllDevices();

    // Configuration du délai pour la recherche
    this.searchSubject.pipe(
      debounceTime(300), // délai de 300 ms
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchDevices(value);
    });
  }

  getAllDevices(): void {
    this.deviceService.getDevices().subscribe(
      (data) => {
        this.devices = data.devices;
        this.totalDevices = this.devices.length;
        this.updateDisplayedDevices();
      },
      (error) => {
        console.error('Error fetching devices', error);
      }
    );
  }

  updateDisplayedDevices(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedDevices = this.devices.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);
  }

  searchDevices(searchValue: string): void {
    if (!searchValue) {
      this.getAllDevices();
      return;
    }

    this.deviceService.searchDevicesByPowerRating(searchValue).subscribe(
      (data) => {
        this.devices = data.devices || [];
        this.totalDevices = this.devices.length;
        this.updateDisplayedDevices();
      },
      (error) => {
        console.error('Error searching devices', error);
      }
    );
  }

  addDevice(): void {
    this.isModalOpen = true;
    this.newDevice = { deviceName: '', powerRating: '', usageFrequency: '' };
    this.editDevice = null;
  }

  submitNewDevice(): void {
    if (!this.newDevice.deviceName) {
      this.invalidDeviceName = true;
      return;
    }

    this.deviceService.addDevice(this.newDevice).subscribe(
      (response) => {
        console.log('Device added successfully:', response);
        this.devices.push({ ...this.newDevice });
        this.totalDevices++;
        this.updateDisplayedDevices();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding device:', error);
      }
    );
  }

  updateDevice(device): void {
    this.newDevice = { ...device };
    this.editDevice = true;
    this.isModalOpen = true;
  }

  submitUpdatedDevice(): void {
    this.deviceService.updateDevice(this.newDevice.deviceName, this.newDevice).subscribe(
      (response) => {
        console.log('Device updated successfully:', response);
        const index = this.devices.findIndex(d => d.deviceName === this.newDevice.deviceName);
        if (index !== -1) {
          this.devices[index] = this.newDevice;
          this.updateDisplayedDevices();
        }
        this.closeModal();
      },
      (error) => {
        console.error('Error updating device:', error);
      }
    );
  }

  deleteDevice(device: any): void {
    this.deviceService.deleteDevice(device.deviceName).subscribe(
      (response) => {
        console.log(response);
        this.devices = this.devices.filter(d => d.deviceName !== device.deviceName);
        this.totalDevices--;
        this.updateDisplayedDevices();
        this.getAllDevices();
      },
      (error) => {
        console.error('Error deleting device', error);
      }
    );
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  filterByPowerRatingRange(): void {
    if (!this.minPowerRating || !this.maxPowerRating) {
      console.warn('Please provide both min and max power rating.');
      return;
    }
  
    this.deviceService.getDevicesByPowerRatingRange(this.minPowerRating, this.maxPowerRating).subscribe(
      (data) => {
        if (data === "No devices found within the specified power rating range.") {
          this.devices = []; // Vide la liste si aucun appareil trouvé
        } else {
          this.devices = data.devices || [];
        }
        this.totalDevices = this.devices.length;
        this.updateDisplayedDevices();
      },
      (error) => {
        console.error('Error fetching devices by power rating range', error);
      }
    );
  }
  onMinPowerRatingChange(): void {
    this.filterByPowerRatingRange();
  }
  
  onMaxPowerRatingChange(): void {
    this.filterByPowerRatingRange();
  }
}
