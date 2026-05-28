export interface TeamMember {
  id: string;
  name: string;
  role: 'locutor' | 'administrador' | 'usuario';
  photo: string;
  program?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Program {
  id: string;
  title: string;
  time: string;
  presenterId?: string;
  days: string[];
  description: string;
}

export const teamData: TeamMember[] = [
  {
    id: '1',
    name: 'João Silva',
    role: 'locutor',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    program: 'Manhã Show'
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'locutor',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    program: 'Tarde Total'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    role: 'locutor',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
    program: 'Conexão Jovem'
  },
  {
    id: '4',
    name: 'Fernanda Lima',
    role: 'locutor',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    program: 'Love Songs'
  },
  {
    id: '5',
    name: 'Roberto Souza',
    role: 'locutor',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    program: 'Madrugada Rádio'
  },
  {
    id: '6',
    name: 'André Costa',
    role: 'administrador',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
];

export const programData: Program[] = [
  {
    id: '1',
    title: 'Despertador Rádio',
    time: '06:00 - 08:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Comece seu dia com as melhores músicas e as principais notícias.',
    presenterId: '5'
  },
  {
    id: '2',
    title: 'Manhã Show',
    time: '08:00 - 11:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Variedades, humor, prêmios e muita música para alegrar sua manhã.',
    presenterId: '1'
  },
  {
    id: '3',
    title: 'Clássicos do Almoço',
    time: '11:00 - 13:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Aquela seleção especial de flashback para acompanhar seu almoço.',
  },
  {
    id: '4',
    title: 'Tarde Total',
    time: '13:00 - 16:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Os maiores sucessos do momento e muita interatividade.',
    presenterId: '2'
  },
  {
    id: '5',
    title: 'Conexão Jovem',
    time: '16:00 - 19:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Pop, Rock e as novidades que estão bombando nas redes.',
    presenterId: '3'
  },
  {
    id: '6',
    title: 'Arquivo Musical',
    time: '19:00 - 21:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'Uma viagem no tempo com os grandes clássicos da música mundial.',
  },
  {
    id: '7',
    title: 'Love Songs',
    time: '21:00 - 00:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex'],
    description: 'As músicas mais românticas para embalar a sua noite.',
    presenterId: '4'
  },
  {
    id: '8',
    title: 'Madrugada Rádio',
    time: '00:00 - 06:00',
    days: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
    description: 'Sua melhor companhia na madrugada, com uma seleção relaxante.',
    presenterId: '5'
  }
];

