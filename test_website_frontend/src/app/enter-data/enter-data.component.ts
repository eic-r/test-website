import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrl: './enter-data.component.css'
})
export class EnterDataComponent {
  selectedTest = '';
  materialData = {
    sampleIdentification: '',
    materialType: '',
  };
  tensileData = {
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
    testDate: '',
    testTemperature: '',
    shearModulus: '',
    ultimateShearStrength: '',
    shearStrainAtFailure: '',
    failureMode: '',
    // Other properties for shear test
  };
  thermalData = {
    testDate: '',
    testTemperature: '',
    thickness: '',
    crossSectionalArea: '',
    thermalConductivity: '',
    temperatureGradient: '',
    heatFlux: '',
    // Other properties for thermal test
  };

  tensileEntries: any[] = [];
  shearEntries: any[] = [];
  thermalEntries: any[] = [];

  constructor(private databaseService: DatabaseService) { }

  onSelectTest(testType: string) {
    this.selectedTest = testType;
    this.resetFormData();
  }

  resetFormData() {
    this.tensileData = {
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
      testDate: '',
      testTemperature: '',
      shearModulus: '',
      ultimateShearStrength: '',
      shearStrainAtFailure: '',
      failureMode: '',
      // Reset other shear test properties
    };
    this.thermalData = {
      testDate: '',
      testTemperature: '',
      thickness: '',
      crossSectionalArea: '',
      thermalConductivity: '',
      temperatureGradient: '',
      heatFlux: '',
      // Reset other thermal test properties
    };
  }

  submitData() {
    switch (this.selectedTest) {
      case 'tensile':
        this.tensileEntries.push({ ...this.combineAndClean(this.materialData, this.tensileData) });
        break;
      case 'shear':
        this.shearEntries.push({ ...this.combineAndClean(this.materialData, this.shearData) });
        break;
      case 'thermalConductivity':
        this.thermalEntries.push({ ...this.combineAndClean(this.materialData, this.thermalData) });
        break;
    }
    this.resetFormData();
  }

  // Methods to handle form submissions would go here
  putTests() {
    this.databaseService.putTests(this.tensileEntries, this.shearEntries, this.thermalEntries, []).subscribe({
      next: (response) => {
        console.log(response);
        this.tensileEntries = [];
        this.shearEntries = [];
        this.thermalEntries = [];
      },
      error: (e) => console.error(e) // handle failure state
    });
  }

  combineAndClean(materialData: Record<string, any>, testData: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries({ ...materialData, ...testData })
            .filter(([_, value]) => value !== "")
    );
  }
}
