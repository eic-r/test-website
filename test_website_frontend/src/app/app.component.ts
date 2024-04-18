import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, // Import FormsModule for forms handling
    RouterModule,
    CommonModule, // Import RouterModule for routing
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedTest = '';
  tensileData = {
    sampleIdentification: '',
    materialType: '',
    testDate: '',
    testTemperature: '',
    gaugeLength: '',
    crossSectionalArea: '',
    ultimateTensileStrength: '',
    tensileModulus: '',
    elongationAtBreak: '',
    poissonRatio: '',
    failureMode: '',
    // Other properties for tensile test
  };
  shearData = {
    sampleIdentification: '',
    materialType: '',
    testDate: '',
    testTemperature: '',
    shearModulus: '',
    ultimateShearStrength: '',
    shearStrainAtFailure: '',
    failureMode: '',
    // Other properties for shear test
  };
  thermalData = {
    sampleIdentification: '',
    materialType: '',
    // Other properties for thermal test
  };

  tensileEntries: any[] = [];
  shearEntries: any[] = [];
  thermalEntries: any[] = [];

  onSelectTest(testType: string) {
    this.selectedTest = testType;
    this.resetFormData();
  }

  resetFormData() {
    this.tensileData = {
      sampleIdentification: '',
      materialType: '',
      testDate: '',
      testTemperature: '',
      gaugeLength: '',
      crossSectionalArea: '',
      ultimateTensileStrength: '',
      tensileModulus: '',
      elongationAtBreak: '',
      poissonRatio: '',
      failureMode: '',
      // Reset other tensile test properties
    };
    this.shearData = {
      sampleIdentification: '',
      materialType: '',
      testDate: '',
      testTemperature: '',
      shearModulus: '',
      ultimateShearStrength: '',
      shearStrainAtFailure: '',
      failureMode: '',
      // Reset other shear test properties
    };
    this.thermalData = {
      sampleIdentification: '',
      materialType: '',
      // Reset other thermal test properties
    };
  }

  submitData() {
    switch (this.selectedTest) {
      case 'tensile':
        this.tensileEntries.push({ ...this.tensileData });
        break;
      case 'shear':
        this.shearEntries.push({ ...this.shearData });
        break;
      case 'thermalConductivity':
        this.thermalEntries.push({ ...this.thermalData });
        break;
    }
    this.resetFormData();
  }

  // Methods to handle form submissions would go here
}
