<template>
    <div>
        <form id="item1" name="chart_head1" class="chart_header">
            <select class="currency" name="currency1">
                <option>btc</option>
            </select>
            <select name="currency2">
                <option>jpy</option>
            </select>
            <input type="date" name="after" value="2019-08-01">
            <input type="date" name="before" value="2019-08-02">
            <select name="candle_stick">
                <option value="日足">日足</option>
            </select>
            <input type="submit" value="検索">
        </form>
        <canvas id="item2" class="canvas chart_1" ></canvas>
        <div id="item3" class="chart_side">
        <!--サポートライン等-->
        </div>
    </div>
</template>

<script>


</script>