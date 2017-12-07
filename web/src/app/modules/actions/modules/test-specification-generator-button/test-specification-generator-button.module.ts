import { NgModule } from '@angular/core';
import { TestSpecificationGeneratorButton } from './components/test-specification-generator-button.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    // MODULE IMPORTS
    BrowserModule
  ],
  declarations: [
    // COMPONENTS IN THIS MODULE
    TestSpecificationGeneratorButton
  ],
  exports: [
    // THE COMPONENTS VISIBLE TO THE OUTSIDE
    TestSpecificationGeneratorButton
  ],
  providers: [
    // SERVICES
  ],
  bootstrap: [
    // COMPONENTS THAT ARE BOOTSTRAPPED HERE
  ]
})

export class TestSpecificationGeneratorButtonModule { }