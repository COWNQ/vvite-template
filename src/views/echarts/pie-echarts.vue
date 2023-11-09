<script lang="ts" setup>
import echarts from '@/utils/echarts.ts'

onMounted(() => {
  onePieEcharts()
  twoPieEcharts()
  ThreePieEcharts()
  FourPieEcharts()
  FivePieEcharts()
})
// TODO echarts__template
// const barO = ref(null)
// function oBarEcharts() {
//   const echart = echarts.init(barO.value)
//   /** @type EChartsOption */
//   const option: ECOption = { }
//   echart.setOption(option)
// }

// 案例1
const pieOne = ref(null)
const pieOnedata = ref([] as Array<any>)
pieOnedata.value = [
  { name: 'x', value: 10 },
  { name: 'xx', value: 56 },
  { name: 'xxx', value: 12 },
  { name: 'xxxx', value: 45 },
  { name: 'xxxxx', value: 75 },
].map((x) => {
  return {
    name: `${x.name}\t\t\t${x.value}条`,
    value: x.value,
  }
})
// 改变数组值从而得到legend需要的值
function onePieEcharts() {
  const echart = echarts.init(pieOne.value)
  /** @type EChartsOption */
  const option = {
    color: ['#23c343', '#b6E245', '#FBE842', '#FF9A', '#CB272D'],
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        return `${params.marker}${params.name}: ${params.value}%`
      },
    },
    title: {
      text: '新增条数',
      subtext: '1000',
      left: '24%',
      top: '40%',
      textAlign: 'center',
      textStyle: {
        fontSize: 14,
        color: '#0000006d',
      },
      subtextStyle: {
        color: '#000000d8',
        fontSize: 24,
      },
      itemGap: 20,
    },
    legend: [
      {
        orient: 'vertical',
        data: pieOnedata.value.slice(0, 3).map(x => x.name),
        icon: 'circle',
        left: '50%',
        top: 'center',
        align: 'left',
        itemGap: 10,
        textStyle: {
          color: '#000000a5',
          fontSize: 14,
        },
        itemHeight: 10,
        itemWidth: 10,
      },
      {
        orient: 'vertical',
        data: pieOnedata.value.slice(3, 6).map(x => x.name),
        icon: 'circle',
        left: '73%',
        top: 'center',
        align: 'left',
        itemGap: 10,
        textStyle: {
          color: '#000000a5',
          fontSize: 14,
        },
        itemHeight: 10,
        itemWidth: 10,
      },
    ],
    series: [
      {
        name: '',
        type: 'pie',
        clockwise: false,
        radius: ['70', '100%'],
        width: '100%',
        height: '60%',
        emphasis: {
          scale: false,
        },
        center: ['25%', '50%'],
        top: 'center',
        label: {
          show: false,
        },
        data: pieOnedata.value,
      },
    ],
  }
  echart.setOption(option)
}

// 2
const pieTwo = ref(null)
const Twodata = ref([{ name: '建筑', value: 34, zb: 18 }, { name: '施工', value: 12, zb: 15 }, { name: '监理', value: 34, zb: 78 }])
function twoPieEcharts() {
  const echart = echarts.init(pieTwo.value)
  /** @type EChartsOption */
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '15%',
      right: '10%',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 15,
      icon: 'circle',
      itemStyle: {
        borderWidth: 0,
        fontSize: 15,
      },
      orient: 'vertical',
      formatter(params: any) {
        const pdata = Twodata.value.filter(res => res.name === params)
        return `${params}  ${pdata[0].zb}`
      },
    },
    grid: {
      left: '8%',
      containLabel: true,
    },
    series: [
      {
        type: 'pie',
        radius: ['52%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: 'aqua',
          borderWidth: 8,
        },
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        data: Twodata.value,
      },
    ],
  }
  echart.setOption(option)
}

const pieThree = ref(null)
function ThreePieEcharts() {
  const echart = echarts.init(pieThree.value)
  /** @type EChartsOption */
  const option = {}
  echart.setOption(option)
}

const pieFour = ref(null)
function FourPieEcharts() {
  const echart = echarts.init(pieFour.value)
  /** @type EChartsOption */
  const option = {}
  echart.setOption(option)
}

const pieFive = ref(null)
function FivePieEcharts() {
  const echart = echarts.init(pieFive.value)
  /** @type EChartsOption */
  const option = {}
  echart.setOption(option)
}
</script>

<template>
  <div style="margin: 0 auto;width: 1800px;">
    <div class="grid">
      <div class="grid-bom">
        <div ref="pieOne" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="pieTwo" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="pieThree" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="pieFour" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="pieFive" class="EC_FixStyle" />
      </div>
      <div class="grid-bom" />
      <div class="grid-bom" />
      <div class="grid-bom" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 400px);
  grid-template-rows: repeat(6, 300px);
  justify-content: center;
  gap: 30px 30px;
}

.grid-bom {
  background-color: aqua;
  border-radius: 15px;
  box-shadow: rgb(0 0 0 / 25%) 0 25px 50px -12px;
}

.EC_FixStyle {
  width: 100%;
  height: 330px;
}
</style>
