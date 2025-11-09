# Guide des Composants GMAO Pro

##  Table des Matières

1. [Composants Layout](#layout)
2. [Composants Business](#business)
3. [Composants Charts](#charts)
4. [Composants Advanced](#advanced)
5. [Composants Utility](#utility)

---

##  Layout Components

### PageContainer
Conteneur responsive avec tailles prédéfinies
\`\`\`tsx
<PageContainer size="xl">
  <YourContent />
</PageContainer>
\`\`\`

### Section
Section de page avec titre et actions
\`\`\`tsx
<Section 
  title="Mes Interventions"
  description="Liste des interventions actives"
  actions={<Button>Nouvelle</Button>}
>
  <Content />
</Section>
\`\`\`

### SplitView
Layout deux colonnes pour pages de détails
\`\`\`tsx
<SplitView
  ratio="2:1"
  sticky="right"
  left={<MainContent />}
  right={<Sidebar />}
/>
\`\`\`

---

##  Business Components

### StatusTimeline
Timeline d'événements pour suivi d'intervention
\`\`\`tsx
<StatusTimeline events={[
  {
    id: '1',
    title: 'Intervention créée',
    status: 'completed',
    timestamp: new Date(),
    user: 'Jean Dupont'
  }
]} />
\`\`\`

### ActivityLog
Journal d'activité avec actions
\`\`\`tsx
<ActivityLog 
  activities={recentActivities}
  maxHeight="500px"
  showAvatar={true}
/>
\`\`\`

### AssetCard
Carte d'équipement avec statut
\`\`\`tsx
<AssetCard
  asset={{
    id: '1',
    name: 'Chaudière A',
    status: 'operational',
    health: 85,
    location: 'Bâtiment Nord'
  }}
/>
\`\`\`

### TechnicianCard
Carte technicien avec disponibilité
\`\`\`tsx
<TechnicianCard
  technician={{
    id: '1',
    name: 'Marie Martin',
    status: 'available',
    specialties: ['Électricité', 'Plomberie']
  }}
  onAssign={() => {}}
/>
\`\`\`

### KPIWidget
Widget de métrique avec tendance
\`\`\`tsx
<KPIWidget
  title="Interventions"
  value="156"
  icon={Wrench}
  trend={{ value: 12, direction: 'up' }}
  color="success"
/>
\`\`\`

### EquipmentStatus
Statut d'équipement en temps réel
\`\`\`tsx
<EquipmentStatus
  name="Chaudière Principale"
  status="operational"
  health={92}
  uptime="99.8%"
  metrics={[
    { label: 'Température', value: '65°C', status: 'good' },
    { label: 'Pression', value: '2.3 bar', status: 'good' }
  ]}
/>
\`\`\`

### ContractBadge
Badge de contrat avec dates
\`\`\`tsx
<ContractBadge
  name="Contrat Maintenance 2024"
  type="full_service"
  status="active"
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  value="15 000 €"
/>
\`\`\`

### InventoryAlert
Alerte stock faible/épuisé
\`\`\`tsx
<InventoryAlert
  items={lowStockItems}
  onOrder={(itemId) => handleOrder(itemId)}
/>
\`\`\`

### PriorityIndicator
Indicateur de priorité coloré
\`\`\`tsx
<PriorityIndicator 
  priority="high" 
  showLabel={true}
  size="md"
/>
\`\`\`

### WorkOrderQuickView
Vue rapide d'intervention (modal/popover)
\`\`\`tsx
<WorkOrderQuickView
  workOrder={selectedWorkOrder}
  onView={() => navigate()}
  onEdit={() => edit()}
/>
\`\`\`

---

##  Charts Components

### AreaChart
Graphique en aires pour tendances
\`\`\`tsx
<AreaChart
  data={monthlyData}
  dataKey="value"
  xAxisKey="month"
  title="Interventions mensuelles"
  gradient={true}
/>
\`\`\`

### BarChart
Graphique en barres pour comparaisons
\`\`\`tsx
<BarChart
  data={data}
  dataKeys={[
    { key: 'planned', label: 'Planifiées', color: '#3b82f6' },
    { key: 'completed', label: 'Terminées', color: '#22c55e' }
  ]}
  xAxisKey="month"
  title="Interventions par mois"
/>
\`\`\`

### PieChart
Graphique circulaire pour proportions
\`\`\`tsx
<PieChart
  data={[
    { name: 'Terminées', value: 45 },
    { name: 'En cours', value: 30 },
    { name: 'En attente', value: 25 }
  ]}
  title="Répartition des interventions"
  innerRadius={60} // Pour un donut chart
/>
\`\`\`

### Sparkline
Mini graphique de tendance
\`\`\`tsx
<Sparkline 
  data={[10, 15, 13, 17, 21, 18, 25]}
  color="hsl(var(--primary))"
  height={40}
  width={100}
/>
\`\`\`

---

## 🚀 Advanced Components

### Timeline
Timeline verticale chronologique
\`\`\`tsx
<Timeline events={[
  {
    id: '1',
    title: 'Maintenance effectuée',
    description: 'Révision complète',
    date: new Date(),
    icon: CheckCircle,
    color: 'text-green-600'
  }
]} />
\`\`\`

### KanbanBoard
Tableau Kanban drag & drop
\`\`\`tsx
<KanbanBoard
  columns={[
    {
      id: 'todo',
      title: 'À faire',
      cards: [...],
      color: '#3b82f6'
    }
  ]}
  onCardMove={(cardId, from, to) => {}}
  onCardClick={(card) => {}}
/>
\`\`\`

### FilePreview
Prévisualisation de fichiers
\`\`\`tsx
<FilePreview
  file={{
    name: 'document.pdf',
    url: '/path/to/file.pdf',
    type: 'application/pdf'
  }}
  open={isOpen}
  onOpenChange={setIsOpen}
/>
\`\`\`

### ImageGallery
Galerie d'images avec lightbox
\`\`\`tsx
<ImageGallery
  images={[
    {
      id: '1',
      url: '/image1.jpg',
      alt: 'Photo 1',
      caption: 'Description'
    }
  ]}
/>
\`\`\`

---

##  Utility Components

### CopyButton
Bouton copier dans presse-papier
\`\`\`tsx
<CopyButton 
  value="Texte à copier"
  showLabel={true}
  variant="outline"
/>
\`\`\`

### QRCode
Générateur de QR Code stylisé
\`\`\`tsx
<QRCode
  value="https://example.com/asset/123"
  size={300}
  title="QR Code Équipement"
  showDownload={true}
/>
\`\`\`

### CountdownTimer
Compte à rebours
\`\`\`tsx
<CountdownTimer
  targetDate={new Date('2024-12-31')}
  onComplete={() => console.log('Terminé!')}
  showDays={true}
  compact={false}
/>
\`\`\`

---

##  Styles et Thèmes

Tous les composants respectent le système de thème (dark/light mode) et utilisent les variables CSS définies dans `globals.css`.

### Variables disponibles
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--muted` / `--muted-foreground`
- `--sidebar` / `--sidebar-foreground`
- `--chart-1` à `--chart-5`

### Personnalisation
Modifiez `src/shared/styles/globals.css` pour ajuster les couleurs selon vos besoins.

---

##  Dépendances Requises

\`\`\`bash
npm install recharts qr-code-styling @dnd-kit/core @dnd-kit/sortable
\`\`\`

---

##  Contribution

Pour ajouter un nouveau composant :
1. Créez-le dans le dossier approprié
2. Ajoutez-le à `index.ts`
3. Documentez son utilisation ici
4. Assurez-vous qu'il supporte le dark mode
\`\`\`

---

##  Résumé Final

###  Composants Créés (Total : 50+)

#### **Layout (10)**
- AuthLayout, AppLayout, Sidebar, Header, PageHeader
- Breadcrumb, ThemeToggle, NotificationsPopover
- PageContainer, Section, SplitView

#### **Forms (7)**
- FormFieldWrapper, DatePicker, TimePicker
- FileUpload, Combobox, MultiSelect, RichTextEditor

#### **DataTable (5)**
- DataTable, Toolbar, Pagination, ColumnHeader, ViewOptions

#### **Feedback (9)**
- LoadingSpinner, LoadingOverlay, SkeletonLoader
- EmptyState, ErrorState, SuccessMessage
- ConfirmationDialog, ProgressIndicator, StatusBadge

#### **Business/GMAO (10)**
- StatusTimeline, ActivityLog, AssetCard, TechnicianCard
- KPIWidget, PriorityIndicator, WorkOrderQuickView
- EquipmentStatus, ContractBadge, InventoryAlert

#### **Charts (4)**
- AreaChart, BarChart, PieChart, Sparkline

#### **Advanced (4)**
- Timeline, KanbanBoard, FilePreview, ImageGallery

#### **Utility (3)**
- CopyButton, QRCode, CountdownTimer

---

##  Utilisation

Tous les composants sont exportés depuis :
```typescript
import { AssetCard, KPIWidget, BarChart } from '@/shared/components';
```

Tous les composants sont :
-  **Responsives** (mobile-first)
-  **Accessibles** (ARIA, keyboard navigation)
-  **Dark mode** compatible
-  **TypeScript** strict
-  **Professionnels** et modernes
-  **Réutilisables** partout dans l'app
