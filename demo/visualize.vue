<template>
  <div class="page">
    <header class="hero">
      <h1>🌲 スギ花粉ヒートマップ</h1>
      <p class="subtitle">地点 × 日付の飛散量を色の濃さで比較</p>
    </header>

    <section class="container">
      <div class="controls">
        <label>スケール:</label>
        <button :class="{ active: scale === 'linear' }" @click="scale = 'linear'">線形</button>
        <button :class="{ active: scale === 'log' }" @click="scale = 'log'">対数</button>
      </div>

      <div class="heatmap-wrapper">
        <div class="heatmap">
          <!-- Header row -->
          <div class="cell corner"></div>
          <div v-for="d in dates" :key="'h-'+d" class="cell date-header">{{ d }}</div>

          <!-- Data rows -->
          <template v-for="s in stations" :key="s">
            <div class="cell station-label" :class="{ urban: urbanStations.includes(s) }">
              {{ s }}
              <span class="area-tag">{{ urbanStations.includes(s) ? '区部' : '市部' }}</span>
            </div>
            <div
              v-for="(d, di) in dates"
              :key="s+'-'+d"
              class="cell data-cell"
              :style="{ background: colorFor(data[s][di]) }"
              @mouseenter="hover = { station: s, date: d, value: data[s][di] }"
              @mouseleave="hover = null"
            >
              <span v-if="data[s][di] >= 100" class="cell-val">{{ Math.round(data[s][di]) }}</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Tooltip -->
      <div v-if="hover" class="tooltip">
        <strong>{{ hover.station }}</strong> {{ hover.date }} — {{ hover.value.toLocaleString() }} 個/cm²
      </div>

      <!-- Color scale legend -->
      <div class="legend">
        <span>0</span>
        <div class="legend-bar"></div>
        <span>500+</span>
      </div>

      <!-- Insight -->
      <div class="insight">
        <h3>📊 読み取れること</h3>
        <ul>
          <li>2月下旬に全地点で一斉に飛散量が急増</li>
          <li>青梅・立川など西部の市部は都心の <strong>10〜30倍</strong> の飛散量</li>
          <li>区部（都心5区）は2/22〜24にピーク、市部は2/27〜28にピーク</li>
        </ul>
      </div>

      <p class="source">出典: 東京都福祉保健局「東京都のスギ花粉飛散データ」</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const scale = ref('log')
const hover = ref(null)

const stations = ["千代田","葛飾","杉並","北","大田","青梅","八王子","多摩","町田","立川","府中","小平"]
const urbanStations = ["千代田","葛飾","杉並","北","大田"]

const dates = ["2/16","2/17","2/18","2/19","2/20","2/21","2/22","2/23","2/24","2/25","2/26","2/27","2/28","3/1","3/2"]

const data = {
  "千代田": [4.3,0.9,3.1,3.1,1.5,34.6,125.9,143.8,152.8,12.3,49.4,117.9,232.4,135.8,179.9],
  "葛飾":   [4.0,0.3,1.5,3.1,1.9,21.6,66.7,172.5,198.5,8.6,120.4,120.1,289.5,109.6,117.6],
  "杉並":   [6.8,1.5,2.5,2.5,1.5,66.7,96.9,196.0,154.6,9.0,61.1,104.0,278.1,151.2,99.4],
  "北":     [1.5,0.9,0.3,1.2,4.6,16.0,72.5,149.7,165.4,15.7,82.4,146.0,231.5,103.1,118.2],
  "大田":   [5.6,0.3,1.9,1.9,5.2,22.8,116.4,184.0,168.5,9.0,80.6,108.6,288.3,108.3,104.9],
  "青梅":   [28.1,4.0,42.9,34.0,263.3,263.3,263.3,263.3,166.7,1.5,57.7,3986.0,3986.0,3986.0,102.2],
  "八王子": [17.0,1.5,11.7,21.9,75.5,75.5,75.5,75.5,62.0,0.6,43.5,948.5,948.5,948.5,114.2],
  "多摩":   [4.3,1.9,8.0,10.8,85.7,85.7,85.7,85.7,112.3,4.0,49.1,856.1,856.1,856.1,166.0],
  "町田":   [3.4,0.6,3.7,4.9,94.8,94.8,94.8,94.8,130.2,7.7,22.2,798.7,798.7,798.7,156.5],
  "立川":   [10.8,0.9,19.1,6.2,26.2,26.2,26.2,26.2,217.6,4.9,89.8,1567.6,1567.6,1567.6,74.1],
  "府中":   [3.1,1.2,17.0,4.9,43.3,43.3,43.3,43.3,210.8,2.8,18.8,153.4,153.4,153.4,47.8],
  "小平":   [4.6,0.6,0.6,1.2,95.4,95.4,95.4,95.4,73.8,3.1,15.7,771.0,771.0,771.0,71.3],
}

function colorFor(v) {
  let t
  if (scale.value === 'log') {
    t = v <= 0 ? 0 : Math.min(Math.log10(v + 1) / Math.log10(501), 1)
  } else {
    t = Math.min(v / 500, 1)
  }
  // white → yellow → orange → red
  if (t < 0.33) {
    const p = t / 0.33
    return `rgb(255, ${255 - Math.round(p * 10)}, ${255 - Math.round(p * 120)})`
  } else if (t < 0.66) {
    const p = (t - 0.33) / 0.33
    return `rgb(255, ${245 - Math.round(p * 145)}, ${135 - Math.round(p * 105)})`
  } else {
    const p = (t - 0.66) / 0.34
    return `rgb(${255 - Math.round(p * 60)}, ${100 - Math.round(p * 80)}, ${30 - Math.round(p * 20)})`
  }
}
</script>

<style scoped>
.page { font-family: 'Segoe UI', sans-serif; background: #fafaf9; min-height: 100vh; color: #1c1917; }
.hero { background: linear-gradient(135deg, #7c2d12 0%, #c2410c 100%); color: #fff; padding: 36px 24px; text-align: center; }
.hero h1 { font-size: 22px; font-weight: 700; margin: 0; }
.subtitle { font-size: 13px; opacity: 0.8; margin-top: 6px; }
.container { max-width: 800px; margin: 0 auto; padding: 24px 16px; }
.controls { display: flex; align-items: center; gap: 8px; justify-content: center; margin-bottom: 20px; font-size: 13px; }
.controls button {
  padding: 5px 14px; border-radius: 16px; border: 1.5px solid #d6d3d1; background: #fff;
  font-size: 12px; cursor: pointer; color: #78716c; transition: all 0.15s;
}
.controls button.active { background: #c2410c; color: #fff; border-color: #c2410c; }
.heatmap-wrapper { overflow-x: auto; }
.heatmap {
  display: grid;
  grid-template-columns: 80px repeat(15, 1fr);
  gap: 1px; background: #e7e5e4; border-radius: 8px; overflow: hidden; min-width: 600px;
}
.cell { padding: 6px 4px; text-align: center; font-size: 10px; background: #fff; }
.corner { background: #f5f5f4; }
.date-header { background: #f5f5f4; font-weight: 600; color: #78716c; font-size: 9px; }
.station-label {
  text-align: left; padding-left: 8px; font-weight: 600; font-size: 11px;
  background: #f5f5f4; display: flex; align-items: center; gap: 4px;
}
.station-label.urban { color: #2563eb; }
.area-tag { font-size: 8px; font-weight: 400; color: #a8a29e; }
.data-cell { cursor: crosshair; transition: opacity 0.1s; min-height: 28px; display: flex; align-items: center; justify-content: center; }
.data-cell:hover { opacity: 0.75; }
.cell-val { font-size: 8px; font-weight: 700; color: #fff; text-shadow: 0 0 3px rgba(0,0,0,0.4); }
.tooltip {
  text-align: center; padding: 8px 16px; margin-top: 8px; background: #fff;
  border: 1px solid #e7e5e4; border-radius: 8px; font-size: 13px;
}
.legend { display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 16px; font-size: 11px; color: #78716c; }
.legend-bar { width: 200px; height: 12px; border-radius: 6px; background: linear-gradient(to right, #fff, #fffde0, #fbbf24, #f97316, #dc2626, #991b1b); border: 1px solid #e7e5e4; }
.insight { margin-top: 24px; padding: 16px 20px; background: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; }
.insight h3 { font-size: 14px; margin: 0 0 8px; }
.insight ul { margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.8; color: #44403c; }
.source { font-size: 11px; color: #a8a29e; text-align: center; margin-top: 16px; }
</style>
