import echarts from '@/utils/echarts.ts';
import type ECOption from '@/types/modules/echarts-ecoptiontype';
import { barOne } from './bar-echarts.vue';

export function toBarEcharts() {
const echart = echarts.init(barOne.value);

const option: ECOption = {
grid: {
top: '20',
},
legend: {
top
}
};
echart.setOption(option);
}
