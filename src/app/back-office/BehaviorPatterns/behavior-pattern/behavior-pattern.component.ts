import { Component, OnInit } from '@angular/core';
import { BehaviorPatternService } from 'src/app/service/behavior-pattern.service';

@Component({
  selector: 'app-behavior-pattern',
  templateUrl: './behavior-pattern.component.html',
  styleUrls: ['./behavior-pattern.component.css']
})
export class BehaviorPatternComponent implements OnInit {
  behaviorPatterns: any[] = [];
  newPattern: any = {}; // To hold the new pattern data
  updatedPattern: any = {}; // To hold the updated pattern data

  constructor(private behaviorPatternService: BehaviorPatternService) {}

  ngOnInit(): void {
    this.loadBehaviorPatterns();
  }

  loadBehaviorPatterns(): void {
    this.behaviorPatternService.getAllBehaviorPatterns().subscribe(
      (data) => {
        console.log(data);
        this.behaviorPatterns = data.behaviorPatterns; // Assigns an empty array if undefined
      },
      error => {
        console.error('Error fetching behavior patterns', error);
      }
    );
  }



  addBehaviorPattern(): void {
    this.behaviorPatternService.addBehaviorPattern(this.newPattern)
      .subscribe(response => {
        console.log(response);
        this.loadBehaviorPatterns(); // Reload the list after adding
        this.newPattern = {}; // Reset new pattern object
      }, error => {
        console.error('Error adding behavior pattern', error);
      });
  }

  editBehaviorPattern(pattern: any): void {
    this.updatedPattern = { ...pattern }; // Clone the pattern to avoid direct mutations
  }

  updateBehaviorPattern(pattern: any): void {
    this.behaviorPatternService.updateBehaviorPattern(pattern.behaviorPatternName, pattern)
      .subscribe(response => {
        console.log('Behavior pattern updated:', response);
        this.loadBehaviorPatterns(); // Reload the list after updating
        this.updatedPattern = {}; // Reset updated pattern object
      }, error => {
        console.error('Error updating behavior pattern', error);
      });
  }

  deleteBehaviorPattern(name: string): void {
    this.behaviorPatternService.deleteBehaviorPattern(name)
      .subscribe(response => {
        console.log(response);
        this.loadBehaviorPatterns(); // Reload the list after deletion
      }, error => {
        console.error('Error deleting behavior pattern', error);
      });
  }

  getBehaviorPatternsWithCarbonReductionStrategy(): void {
    this.behaviorPatternService.getBehaviorPatternsWithCarbonReductionStrategy()
      .subscribe(data => {
        this.behaviorPatterns = data;
      }, error => {
        console.error('Error fetching behavior patterns with carbon reduction strategy', error);
      });
  }
}
