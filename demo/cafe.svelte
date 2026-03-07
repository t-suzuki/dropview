<script>
  import { fade } from 'svelte/transition';

  let activeCategory = $state('Lunch');

  const categories = ['Lunch', 'Side', 'Drink'];

  const items = [
    { name: 'マルゲリータ', price: 1280, desc: 'モッツァレラとバジルの定番', category: 'Lunch' },
    { name: 'ボロネーゼ', price: 1180, desc: '粗挽き肉のじっくり煮込みソース', category: 'Lunch' },
    { name: 'サーモンのカルパッチョ丼', price: 1350, desc: 'オリーブオイルとレモンで爽やかに', category: 'Lunch' },
    { name: 'シーザーサラダ', price: 680, desc: 'パルミジャーノたっぷり', category: 'Side' },
    { name: 'ガーリックトースト', price: 380, desc: 'カリッと香ばしい自家製', category: 'Side' },
    { name: 'レモネード', price: 450, desc: '国産レモンのフレッシュスカッシュ', category: 'Drink' },
    { name: 'クラフトビール', price: 750, desc: '日替わり地ビール', category: 'Drink' },
  ];

  let filteredItems = $derived(items.filter(i => i.category === activeCategory));
</script>

<div class="page">
  <header class="hero">
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" class="logo">
      <rect x="3" y="3" width="46" height="46" rx="23" stroke="#86efac" stroke-width="2" fill="none" />
      <ellipse cx="26" cy="28" rx="12" ry="6" stroke="#86efac" stroke-width="2" fill="none" />
      <path d="M14 28c0-8 5-14 12-14s12 6 12 14" stroke="#86efac" stroke-width="2" stroke-linecap="round" fill="none" />
      <line x1="26" y1="14" x2="26" y2="10" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
      <line x1="22" y1="15" x2="21" y2="11" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
      <line x1="30" y1="15" x2="31" y2="11" stroke="#86efac" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
    </svg>
    <h1>Midori Kitchen</h1>
    <p class="subtitle">緑あふれるキッチンで、おいしいひととき</p>
  </header>

  <section class="menu-section">
    <h2>Lunch Menu</h2>
    <div class="tabs">
      {#each categories as cat}
        <button
          class="tab"
          class:active={activeCategory === cat}
          onclick={() => activeCategory = cat}
        >{cat}</button>
      {/each}
    </div>

    <div class="menu-list">
      {#each filteredItems as item (item.name)}
        <div class="menu-card" in:fade={{ duration: 150 }} out:fade={{ duration: 100 }}>
          <div class="card-header">
            <span class="card-name">{item.name}</span>
            <span class="card-price">¥{item.price}</span>
          </div>
          <p class="card-desc">{item.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <footer class="foot">
    <p>Lunch 11:00 - 15:00 / Dinner 17:00 - 22:00 / 火曜定休</p>
  </footer>
</div>

<style>
  .page {
    font-family: 'Segoe UI', sans-serif;
    background: #f0fdf4;
    min-height: 100vh;
    color: #1a3a2a;
  }
  .hero {
    background: linear-gradient(135deg, #166534 0%, #15803d 100%);
    color: #fff;
    text-align: center;
    padding: 48px 24px;
  }
  .logo { margin-bottom: 14px; }
  .hero h1 { font-size: 24px; font-weight: 700; margin: 0; color: #86efac; }
  .subtitle { font-size: 13px; opacity: 0.8; margin-top: 6px; }
  .menu-section { max-width: 480px; margin: 0 auto; padding: 32px 24px; }
  .menu-section h2 { font-size: 18px; font-weight: 700; text-align: center; color: #166534; margin-bottom: 16px; }
  .tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; }
  .tab {
    padding: 6px 18px; border-radius: 20px; border: 1.5px solid #d1d5db;
    background: #fff; font-size: 13px; font-weight: 500; cursor: pointer;
    color: #6b7280; transition: all 0.2s;
  }
  .tab.active { background: #166534; color: #fff; border-color: #166534; }
  .menu-list { display: flex; flex-direction: column; gap: 10px; position: relative; min-height: 180px; }
  .menu-card {
    background: #fff; border: 1px solid #dcfce7; border-radius: 10px;
    padding: 14px 16px; transition: box-shadow 0.15s;
  }
  .menu-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .card-header { display: flex; justify-content: space-between; align-items: baseline; }
  .card-name { font-weight: 600; font-size: 14px; }
  .card-price { font-weight: 700; color: #15803d; font-size: 14px; }
  .card-desc { font-size: 11.5px; color: #94a3b8; margin-top: 4px; }
  .foot { text-align: center; padding: 32px; font-size: 11px; color: #94a3b8; }
</style>
