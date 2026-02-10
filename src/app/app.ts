import { Component, signal } from '@angular/core';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { HeroSection } from './components/hero-section/hero-section';
import { Contact } from './components/contact/contact';
import { Skills } from './components/skills/skills';
import { About } from './components/about/about';

@Component({
  selector: 'app-root',
  imports: [ Footer, Navbar, HeroSection, Contact, Skills, About],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('web-portfolio');
}
