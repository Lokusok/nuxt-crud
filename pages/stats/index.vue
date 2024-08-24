<template>

  <div
    v-if="status === 'pending'"
    class="flex justify-center"
  >
    <TheSpinner />
  </div>

  <v-chart
    v-else
    :option="option"
    class="chart"
    autoresize
  />
</template>

<script setup>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { provide, computed, watchEffect } from 'vue';
import { useFetch, useSeoMeta } from '#app';
import { useI18n, useUserSession } from '#imports';

const { t } = useI18n()

useSeoMeta({
  title: t('stats.headTitle')
})

const { data: stats, status } = useFetch('/api/users/stats')
const userSession = useUserSession()

watchEffect(() => {
  console.log(userSession.loggedIn.value)
})

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

provide(THEME_KEY, 'dark');

const option = computed(() => ({
  title: {
    text: t('stats.title'),
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [t('stats.withAvatarsTitle'), t('stats.withoutAvatarsTitle')],
  },
  series: [
    {
      name: t('stats.title'),
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: stats.value?.result?.usersWithAvatar.length, name: t('stats.withAvatarsTitle') },
        { value: stats.value?.result?.usersWithoutAvatar.length, name: t('stats.withoutAvatarsTitle') },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}));
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
