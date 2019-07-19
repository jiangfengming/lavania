import Draw from '../utils/Draw'
import Utils from '../Utils'
import { calcOHLC } from './dataPrepare'



function drawOHLC(ctx, OHLC, columnWidth, ohlcColor) {
  let half = Utils.Coord.halfcandleWidth(columnWidth)

  let lineWidth = ~~(columnWidth / 10)

  if (lineWidth > 1)
  lineWidth += ctx.lineWidth % 2 ? 0 : 1

  for (let direction in OHLC) {
    Draw.Stroke(ctx, ctx => {
      ctx.lineWidth = lineWidth
      OHLC[direction].forEach(ohlc => {
        ctx.moveTo(ohlc.x + 0.5,  ohlc.low)
        ctx.lineTo(ohlc.x + 0.5,  ohlc.high)
        ctx.moveTo(~~(ohlc.x - half) + 0.5, ohlc.open )
        ctx.lineTo(ohlc.x, ohlc.open)
        ctx.moveTo(~~(ohlc.x + half) + 0.5, ohlc.close)
        ctx.lineTo(ohlc.x, ohlc.close)
        // ctx.rect(~~(ochl.x - half) + 0.5 , ~~Math.min(candle.open, candle.close) + 0.5, half * 2 ,~~Math.abs(candle.open - candle.close)) // + 0.02 is for IE fix
      })
    }, ohlcColor[direction])
  }
}


export default function(ctx, data, coord, seriesConf) {
  const OHLC = calcOHLC(data, coord, seriesConf)
  console.log('OHLC',coord)
  drawOHLC(ctx, OHLC, coord.viewport.width, seriesConf.style.OHLC)
}