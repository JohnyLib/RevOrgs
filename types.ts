import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[]; // Array of images for the slider
  client?: string;
  link?: string;
  year: string;
  tags?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TechItem {
  name: string;
  icon: React.ReactNode;
}