
import {
  PythonIcon,
  ReactIcon,
  PyTorchIcon,
  ScikitLearnIcon,
  TensorFlowIcon,
  NextJsIcon,
  DockerIcon,
  KubernetesIcon
} from '@/components/icons';
import { Bot, Cpu, Database, Cloud, Code, Link as LinkIcon, Eye, BrainCircuit, Sparkles, Wind, FileText } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export const iconMap: { [key: string]: ComponentType<SVGProps<SVGSVGElement>> } = {
  Bot,
  Cpu,
  Database,
  Cloud,
  Code,
  LinkIcon,
  Eye,
  BrainCircuit,
  Sparkles,
  Wind,
  FileText,
  PythonIcon,
  ReactIcon,
  PyTorchIcon,
  ScikitLearnIcon,
  TensorFlowIcon,
  NextJsIcon,
  DockerIcon,
  KubernetesIcon
};
