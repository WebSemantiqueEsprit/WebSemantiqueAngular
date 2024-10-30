import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface OptimizationSolution {
  solutionName: string;
  implementationCost: number;
  costSavings: number;
}

@Component({
  selector: 'app-optimization-solution',
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.css']
})
export class SolutionListComponent implements OnInit {
  optimizationSolutions: OptimizationSolution[] = [];
  filteredSolutions: OptimizationSolution[] = [];
  isModalOpen = false;
  editOptimizationSolution: boolean = false;
  newOptimizationSolution: OptimizationSolution = { solutionName: '', implementationCost: 0, costSavings: 0 };
  searchTerm: string = '';
  filterCriterion: string = '';

  // New properties for cost and savings ranges
  minCost: number | null = null;
  maxCost: number | null = null;
  minSavings: number | null = null;
  maxSavings: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadOptimizationSolutions();
  }

  loadOptimizationSolutions() {
    this.http.get<{ optimizationSolutions: any[] }>('http://localhost:8082/api/optimizationSolutions')
      .subscribe(response => {
        this.optimizationSolutions = response.optimizationSolutions.map(solution => ({
          solutionName: solution.solutionName,
          implementationCost: solution.properties.hasImplementationCost,
          costSavings: solution.properties.hasCostSavings
        }));
        this.filteredSolutions = this.optimizationSolutions; // Initialize filteredSolutions with all solutions
      });
  }

  filterSolutions() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredSolutions = this.optimizationSolutions.filter(solution => {
      const matchesSearch = solution.solutionName.toLowerCase().includes(searchTermLower);
      const matchesFilter = this.filterCriterion === '' ||
        (this.filterCriterion === 'low-cost' && solution.implementationCost < 2000) || // Adjust this condition
        (this.filterCriterion === 'high-cost' && solution.implementationCost >= 2000);

      // Add range filters for cost and savings
      const matchesCostRange = (this.minCost === null || solution.implementationCost >= this.minCost) &&
        (this.maxCost === null || solution.implementationCost <= this.maxCost);
      const matchesSavingsRange = (this.minSavings === null || solution.costSavings >= this.minSavings) &&
        (this.maxSavings === null || solution.costSavings <= this.maxSavings);

      return matchesSearch && matchesFilter && matchesCostRange && matchesSavingsRange;
    });
  }

  openModal(solution?: OptimizationSolution) {
    if (solution) {
      this.editOptimizationSolution = true;
      this.newOptimizationSolution = { ...solution };
    } else {
      this.editOptimizationSolution = false;
      this.newOptimizationSolution = { solutionName: '', implementationCost: 0, costSavings: 0 };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newOptimizationSolution = { solutionName: '', implementationCost: 0, costSavings: 0 };
  }

  submitOptimizationSolution() {
    if (this.editOptimizationSolution) {
      this.http.put('http://localhost:8082/api/optimizationSolutions/update', this.newOptimizationSolution)
        .subscribe(() => {
          this.loadOptimizationSolutions();
          this.closeModal();
        });
    } else {
      this.http.post('http://localhost:8082/api/optimizationSolutions', this.newOptimizationSolution)
        .subscribe(() => {
          this.loadOptimizationSolutions();
          this.closeModal();
        });
    }
  }


  deleteOptimizationSolution(solutionName: string) {
    this.http.delete(`http://localhost:8082/api/optimizationSolutions/${solutionName}`)
      .subscribe(() => {
        this.loadOptimizationSolutions();
      });
  }
}
