<script lang="ts" setup>
import echarts from '@/utils/echarts.ts'

onMounted(() => {
  oneBarEcharts()
  twoBarEcharts()
  ThreeBarEcharts()
  FourBarEcharts()
  FiveBarEcharts()
})

// TODO echarts__template
// const barO = ref(null)
// function oBarEcharts() {
//   const echart = echarts.init(barO.value)
//   /** @type EChartsOption */
//   const option = { }
//   echart.setOption(option)
// }

// 1
const barOne = ref(null)
function oneBarEcharts() {
  const echart = echarts.init(barOne.value)
  /** @type EChartsOption */
  const option = {
    grid: {
      top: '50', // 值越大，整体越扁
    },
    legend: {
      top: 0,
      itemWidth: 15,
      itemHeight: 10,
      itemGap: 15,
      borderRadius: 4,
      textStyle: {
        color: '#000',
        fontSize: 12,
        fontWeight: '400',
      },
    },
    xAxis: {
      type: 'category',
      data: [20, 10, 10, 15, 13],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        color: '#393939',
      },
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        padding: [0, 0, 0, -30],
        color: '#000',
        fontSize: 14,
        fontWeight: 600,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: [5, 5],
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      max: Math.max(...[20, 10, 10, 15, 13]) + 5,
    },
    series: [
      {
        type: 'bar',
        barWidth: 15,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          fontSize: 12,
        },
        itemStyle: {
          color(params: any) {
            const colorlist = ['#23c343', '#b6E245', '#FBE842', '#FF9A', '#CB272D']
            return colorlist[params.dataIndex]
          },
        },
        data: [12, 14, 15, 23, 54, 65],
      },
    ],
  }
  echart.setOption(option)
}

// 2
const barTwo = ref(null)
function twoBarEcharts() {
  const echart = echarts.init(barTwo.value)
  /** @type EChartsOption */
  const option = {
    xAxis: {
      name: 'ug/m³',
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eff0f0',
        },
      },
      axisLabel: {
        show: true,
        // echarts-disable-next-line
        textStyle: {
          color: '#000',
        },
      },
      nameTextStyle: {
        color: '#000',
        // padding: [0, 0, 0, -14],  偏移量
        // fontSize: 12,
      },
    },
    grid: {
      width: '290',
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eff0f0',
        },
      },
      axisLabel: {
        show: true,
        // echarts-disable-next-line
        textStyle: {
          color: '#000',
        },
      },
      data: ['第一', '第二', '第三', '第四', '第五'],
    },
    series: [
      {
        type: 'bar',
        barWidth: 15,
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
        },
        itemStyle: {
          // echarts-disable-next-line
          normal: {
            color(params: any) {
              const colorlist = ['#23c343', '#b6E245', '#FBE842', '#FF9A', '#CB272D']
              return colorlist[params.dataIndex]
            },
          },

        },
        data: [12, 14, 15, 23, 54, 65],
      },
    ],
  }
  echart.setOption(option)
}

const barThree = ref(null)
function ThreeBarEcharts() {
  const echart = echarts.init(barThree.value)
  /** @type EChartsOption */
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      right: 45,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
      },
      padding: [20, 20, 0, 0],
    },
    xAxis: [
      {
        type: 'category',
        data: ['xxx', 'xx', 'xxxx'],
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [{
      name: '（家）',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 14,
        padding: [0, 0, 10, -30],
      },
      type: 'value',
    }],
    series: [
      {
        name: '本地',
        type: 'bar',
        barWidth: 40,
        stack: 'Ad',
        emphasis: {
          focus: 'series',
        },
        label: {
          show: true,
          color: '#ffff',
        },
        itemStyle: {
          // echarts-disable-next-line
          normal: {
            color: 'rgba(255,154,45,1)',
          },
        },
        data: [50, 45, 80],
      },
      {
        name: '外地',
        type: 'bar',
        barWidth: 40,
        stack: 'Ad',
        emphasis: {
          focus: 'series',
        },
        label: {
          show: true,
          color: '#ffff',
        },
        itemStyle: {
          // echarts-disable-next-line
          normal: {
            color: 'rgba(87,169,251,1)',
          },
        },
        data: [123, 50, 120],
      },
    ],
  }
  echart.setOption(option)
}

const barFour = ref(null)
function FourBarEcharts() {
  const echart = echarts.init(barFour.value)
  /** @type EChartsOption */
  const option = {
    color: ['#4A83F1'],
    legend: {
      show: false,
    },
    grid: {
      top: '30',
      bottom: '60',
      left: '40',
      right: '40',
      containLabel: true,
    },
    xAxis: {
      splitLine: {
        show: false,
      },
      type: 'value',
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      type: 'category',
      data: ['qq', 'ww', 'ee', 'rr', 'tt', 'yyy', 'uu', 'ii'],
    },
    series: [
      {
        data: [123, 23, 123, 45, 64, 12, 123, 53],
        type: 'bar',
        barWidth: 8,
        showBackground: true,
        backgroundStyle: {
          color: '#D9E6FF',
        },
      },
    ],
  }
  echart.setOption(option)
}

const barFive = ref(null)
function FiveBarEcharts() {
  const echart = echarts.init(barFive.value)
  /** @type EChartsOption */
  const option = {
    grid: {
      top: '10',
      bottom: '40',
      left: '20',
      right: '10',
      containLabel: true,
    },
    xAxis: [{ show: false }, { show: false }],
    yAxis: [
      {
        show: false,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        type: 'category',
        data: ['qq', 'ww', 'ee', 'rr', 'tt', 'yyy', 'uu', 'ii'],
      },
    ],
    series: [
      {
        name: '进度',
        // echarts-disable-next-line
        show: true,
        type: 'bar',
        barGap: '-100%',
        xAxisIndex: 1,
        barWidth: 10,
        itemStyle: {
          borderRadius: 4,
          color: '#4C91FF',
        },
        labelLine: {
          show: false,
        },
        label: { // 上方显示
          width: 51,
          height: 15,
          distance: 12,
          fontSize: 14,
          fontWeight: 'bold',
          align: 'center',
          verticalAlign: 'middle',
          borderRadius: 5,
          backgroundColor: '#F7FAFF',
          show: true,
          position: 'top',
          formatter: '{c}个',
          color: '#4C91FF',
        },
        data: [123, 23, 123, 45, 64, 12, 123, 53],
      },
      {
        name: '名称',
        z: 1,
        // echarts-disable-next-line
        show: true,
        type: 'bar',
        barGap: '-100%',
        xAxisIndex: 1,
        barWidth: 10,
        itemStyle: {
          borderRadius: 4,
          color: '#dfdde0',
        },
        label: {
          show: true,
          verticalAlign: 'middle',
          position: 'left',
          // echarts-disable-next-line
          left: 10,
          fontSize: 14,
          color: '#000',
        },
        data: [123, 23, 123, 45, 64, 12, 123, 53],
      },
    ],
  }
  echart.setOption(option)
}
</script>

<template>
  <div style="margin: 0 auto;width: 1800px;">
    <div class="grid">
      <div class="grid-bom">
        <div ref="barOne" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="barTwo" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="barThree" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="barFour" class="EC_FixStyle" />
      </div>
      <div class="grid-bom">
        <div ref="barFive" class="EC_FixStyle" />
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
