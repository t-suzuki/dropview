<template>
  <div class="page">
    <header class="hero">
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" class="logo">
        <rect x="3" y="3" width="46" height="46" rx="23" stroke="#fbbf24" stroke-width="2" fill="none" />
        <path d="M18 20c0 6 4 12 8 12s8-6 8-12" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" fill="none" />
        <path d="M34 20c2.5 0 5 1.5 5 4s-2.5 4-5 4" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" fill="none" />
        <line x1="22" y1="16" x2="22" y2="12" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
        <line x1="26" y1="14" x2="26" y2="9" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
        <line x1="30" y1="16" x2="30" y2="12" stroke="#fbbf24" stroke-width="1.5" stroke-linecap="round" opacity="0.5" />
      </svg>
      <h1>Hinata Cafe</h1>
      <p class="subtitle">陽だまりのカフェで、ほっとひと息</p>
    </header>

    <section class="menu-section">
      <h2>Today's Menu</h2>
      <div class="tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['tab', { active: activeCategory === cat }]"
          @click="activeCategory = cat"
        >{{ cat }}</button>
      </div>

      <TransitionGroup name="fade" tag="div" class="menu-list">
        <div v-for="item in filteredItems" :key="item.name" class="menu-card">
          <div class="card-header">
            <span class="card-name">{{ item.name }}</span>
            <span class="card-price">¥{{ item.price }}</span>
          </div>
          <p class="card-desc">{{ item.desc }}</p>
        </div>
      </TransitionGroup>
    </section>

    <footer class="foot">
      <p>Open 9:00 - 19:00 / Open Daily</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('Coffee')

const categories = ['Coffee', 'Tea', 'Sweets']

const items = [
  { name: 'Drip Coffee', price: 430, desc: '丁寧にハンドドリップ', category: 'Coffee' },
  { name: 'Cafe au Lait', price: 500, desc: 'たっぷりミルクで優しい味', category: 'Coffee' },
  { name: 'Espresso Tonic', price: 550, desc: '爽快トニック × エスプレッソ', category: 'Coffee' },
  { name: 'Hojicha Latte', price: 520, desc: '焙じ茶の香ばしいラテ', category: 'Tea' },
  { name: 'Yuzu Green Tea', price: 480, desc: '柚子が香る煎茶', category: 'Tea' },
  { name: 'Basque Cheesecake', price: 580, desc: '濃厚バスクチーズケーキ', category: 'Sweets' },
  { name: 'Matcha Tiramisu', price: 620, desc: '抹茶のほろ苦ティラミス', category: 'Sweets' },
]

const filteredItems = computed(() => items.filter(i => i.category === activeCategory.value))
</script>

<style scoped>
.page {
  font-family: 'Segoe UI', sans-serif;
  background: #fffbeb;
  min-height: 100vh;
  color: #44403c;
}
.hero {
  background: linear-gradient(135deg, #92400e 0%, #b45309 100%);
  color: #fff;
  text-align: center;
  padding: 48px 24px;
}
.logo { margin-bottom: 14px; }
.hero h1 { font-size: 24px; font-weight: 700; margin: 0; color: #fbbf24; }
.subtitle { font-size: 13px; opacity: 0.8; margin-top: 6px; }
.menu-section { max-width: 480px; margin: 0 auto; padding: 32px 24px; }
.menu-section h2 { font-size: 18px; font-weight: 700; text-align: center; color: #92400e; margin-bottom: 16px; }
.tabs { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; }
.tab {
  padding: 6px 18px; border-radius: 20px; border: 1.5px solid #d6d3d1;
  background: #fff; font-size: 13px; font-weight: 500; cursor: pointer;
  color: #78716c; transition: all 0.2s;
}
.tab.active { background: #92400e; color: #fff; border-color: #92400e; }
.menu-list { display: flex; flex-direction: column; gap: 10px; }
.menu-card {
  background: #fff; border: 1px solid #e7e5e4; border-radius: 10px;
  padding: 14px 16px; transition: box-shadow 0.15s;
}
.menu-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.card-header { display: flex; justify-content: space-between; align-items: baseline; }
.card-name { font-weight: 600; font-size: 14px; }
.card-price { font-weight: 700; color: #b45309; font-size: 14px; }
.card-desc { font-size: 11.5px; color: #a8a29e; margin-top: 4px; }
.foot { text-align: center; padding: 32px; font-size: 11px; color: #a8a29e; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
