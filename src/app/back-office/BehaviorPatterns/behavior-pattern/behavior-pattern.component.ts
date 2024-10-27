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
    this.behaviorPatternService.getAllBehaviorPatterns()
      .subscribe(data => {
        this.behaviorPatterns = data;
      }, error => {
        console.error('Error fetching behavior patterns', error);
      });
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

  updateBehaviorPattern(name: string): void {
    this.behaviorPatternService.updateBehaviorPattern(name, this.updatedPattern)
      .subscribe(response => {
        console.log(response);
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
