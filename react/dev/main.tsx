import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index';
import { Button, Toggle, Slider, Accordion, Input, Card } from '../src/components';

function App() {
  const [toggleChecked, setToggleChecked] = React.useState(false);
  const [sliderVal, setSliderVal] = React.useState(50);

  return (
    <div style={{ padding: '40px', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', marginBottom: 8 }}>
        🌸 FlorisUI React
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 40 }}>
        Test des composants React
      </p>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>🎯 Button</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="primary" onClick={() => alert('🌸')}>Primary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>🔄 Toggle</h3>
        <Toggle checked={toggleChecked} onChange={setToggleChecked} label={toggleChecked ? 'Activé' : 'Désactivé'} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>🌊 Slider</h3>
        <Slider value={sliderVal} onChange={setSliderVal} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>🌱 Accordion</h3>
        <Accordion items={[
          { id: '1', icon: '🌸', title: 'Design vivant', content: 'Les interfaces FlorisUI respirent et bougent comme des organismes naturels.' },
          { id: '2', icon: '🎨', title: 'Identité artistique', content: 'Chaque pixel est pensé pour une expérience visuelle forte.' },
        ]} />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>⌨️ Input</h3>
        <Input label="Votre message" />
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>📦 Card</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <Card icon="🌸" title="FlorisUI" description="Interfaces that bloom" />
          <Card icon="✨" title="Élégant" description="Simplicité raffinée" />
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
