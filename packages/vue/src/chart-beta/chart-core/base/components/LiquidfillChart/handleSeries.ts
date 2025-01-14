import merge from '../../util/merge'
import cloneDeep from '../../util/cloneDeep'
import Theme from '../../feature/theme'

export const seriesInit = {
  type: 'liquidFill',
  center: ['50%', '50%'],
  color: '',
  backgroundStyle: {
    color: ''
  },
  outline: {
    itemStyle: {
      borderColor: '',
      shadowBlur: 0
    }
  },
  itemStyle: {
    opacity: 1,
    shadowBlur: 5,
    shadowColor: 'rgba(0, 0, 0, 0.4)'
  },
  label: {},
  data: []
}

/**
 * 组装echarts所需要的series
 * @param {传入数据} iChartOption
 * @returns
 */
export function setSeries(iChartOption) {
  const { data, shape, color, theme, name, label, outline, backgroundStyle } = iChartOption
  const series = []
  const selfSeries = iChartOption.series
  if (selfSeries !== undefined && selfSeries.length !== 0) {
    selfSeries.forEach((item) => {
      const seriesUnit = cloneDeep(seriesInit)
      item.data && (seriesUnit.data = item.data)
      item.center && (seriesUnit.center = item.center)
      item.shape && (seriesUnit.shape = item.shape)
      setColor(seriesUnit, item, theme, color)
      setBackgroundStyle(seriesUnit, item, theme, backgroundStyle)
      setOutline(seriesUnit, item, theme, outline)
      setLabel(seriesUnit, item, theme, label)
      merge(seriesUnit, item)
      series.push(seriesUnit)
    })
  } else {
    const seriesUnit = cloneDeep(seriesInit)
    data && (seriesUnit.data = data)
    name && (seriesUnit.name = name)
    shape && (seriesUnit.shape = shape)
    // 配置color
    setColor(seriesUnit, iChartOption, theme)
    // 配置backgroundStyle
    setBackgroundStyle(seriesUnit, iChartOption, theme)
    // 配置outlineColor
    setOutline(seriesUnit, iChartOption, theme)
    // 配置label
    setLabel(seriesUnit, iChartOption, theme)
    series.push(seriesUnit)
  }
  return series
}

// 设置Label的属性
function setLabel(seriesTarget, seriesSource, theme, label) {
  const colorBase = Theme.color.base
  // 多个数据：series里面label存在
  // 单个数据：没有series时一级属性label存在
  if (seriesSource.label !== undefined) {
    seriesTarget.label.color = colorBase.font
    seriesTarget.label.position = 'inside'
    seriesTarget.label.show = true
    merge(seriesTarget.label, seriesSource.label)
  }
  // 多个/单个数据：series里面label不存在但一级属性label存在
  else if (seriesSource.label === undefined && label) {
    seriesTarget.label.color = colorBase.font
    seriesTarget.label.position = 'inside'
    seriesTarget.label.show = true
    merge(seriesTarget.label, label)
  }
  // 多个/单个数据：series和一级属性都不存在label，设置初始值
  else {
    seriesTarget.label.color = colorBase.font
    seriesTarget.label.position = 'inside'
    seriesTarget.label.show = true
  }
}

// 设置Outline的属性
function setOutline(seriesTarget, seriesSource, theme, outline) {
  const colorGroup = Theme.color.group
  const itemStyle = seriesTarget.outline.itemStyle
  // 多个数据：series里面outline存在
  // 单个数据：没有series时一级属性outline存在
  if (seriesSource.outline !== undefined) {
    itemStyle.borderColor = colorGroup[0]
    merge(seriesTarget.outline, seriesSource.outline)
  }
  // 多个/单个数据：series里面outline不存在但一级属性outline存在
  else if (seriesSource.outline === undefined && outline) {
    itemStyle.borderColor = colorGroup[0]
    merge(seriesTarget.outline, outline)
  }
  // 多个/单个数据：series和一级属性都不存在outline，设置初始值
  else {
    itemStyle.borderColor = colorGroup[0]
  }
}

// 设置BackgroundStyle的属性
function setBackgroundStyle(seriesTarget, seriesSource, theme, backgroundStyle) {
  const colorBase = Theme.color.base
  // 多个数据：series里面backgroundStyle存在
  // 单个数据：没有series时一级属性backgroundStyle存在
  if (seriesSource.backgroundStyle !== undefined) {
    seriesTarget.backgroundStyle.color = colorBase.main
    merge(seriesTarget.backgroundStyle, seriesSource.backgroundStyle)
  }
  // 多个/单个数据：series里面backgroundStyle不存在但一级属性backgroundStyle存在
  else if (seriesSource.backgroundStyle === undefined && backgroundStyle) {
    seriesTarget.backgroundStyle.color = colorBase.main
    merge(seriesTarget.backgroundStyle, backgroundStyle)
  }
  // 多个/单个数据：series和一级属性都不存在backgroundStyle，设置初始值
  else {
    seriesTarget.backgroundStyle.color = colorBase.main
  }
}

// 设置Color的属性
function setColor(seriesTarget, seriesSource, theme, color) {
  const colorGroup = Theme.color.group
  // 多个数据：series里面color存在
  // 单个数据：没有series时一级属性存在color
  if (seriesSource.color !== undefined) {
    seriesTarget.color = [...colorGroup]
    merge(seriesTarget.color, seriesSource.color)
  }
  // 多个/单个数据：series里面color不存在但一级属性color存在
  else if (seriesSource.color === undefined && color) {
    seriesTarget.color = [...colorGroup]
    merge(seriesTarget.color, color)
  }
  // 多个/单个数据：series和一级属性都不存在color，设置初始值
  else {
    seriesTarget.color = [...colorGroup]
  }
}
