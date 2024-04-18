import { Component } from '@angular/core';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrl: './enter-data.component.css'
})
export class EnterDataComponent {
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
