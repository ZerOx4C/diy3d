var draw = {
    pixel: function (context, x, y, color) {
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
    },
    _segmentByX: function (context, xStart, xEnd, yStart, yEnd, color) {
        var y = yStart;
        var s = (yEnd - yStart) / (xEnd - xStart);
        for (var x = xStart; x <= xEnd; ++x) {
            draw.pixel(context, x, Math.round(y), color);
            y += s;
        }
    },
    _segmentByY: function (context, xStart, xEnd, yStart, yEnd, color) {
        var x = xStart;
        var s = (xEnd - xStart) / (yEnd - yStart);
        for (var y = yStart; y <= yEnd; ++y) {
            draw.pixel(context, Math.round(x), y, color);
            x += s;
        }
    },
    segment: function (context, x1, y1, x2, y2, color) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        if (Math.abs(dy) < Math.abs(dx)) {
            if (x1 < x2) draw._segmentByX(context, x1, x2, y1, y2, color);
            else         draw._segmentByX(context, x2, x1, y2, y1, color);
        }
        else {
            if (y1 < y2) draw._segmentByY(context, x1, x2, y1, y2, color);
            else         draw._segmentByY(context, x2, x1, y2, y1, color);
        }
    },
    _getIntersectionX: function (x1, y1, x2, y2, y) {
        // segment is horizon.
        if (y1 == y2) {
            return null;
        }
        // out of range.
        if (y < Math.min(y1, y2) || Math.max(y1, y2) < y) {
            return null;
        }
        return Math.round((y - y1) * (x1 - x2) / (y1 - y2) + x1);
    },
    triangle: function (context, x1, y1, x2, y2, x3, y3, color) {
        var ix1 = null;
        var ix2 = null;
        var yStart = Math.min(y1, y2, y3);
        var yEnd   = Math.max(y1, y2, y3);
        for (var y = yStart; y <= yEnd; ++y) {
            ix1 = draw._getIntersectionX(x1, y1, x2, y2, y);
            ix2 = draw._getIntersectionX(x2, y2, x3, y3, y);
            if (ix1 == null) {
                ix1 = draw._getIntersectionX(x3, y3, x1, y1, y);
            }
            else if (ix2 == null) {
                ix2 = draw._getIntersectionX(x3, y3, x1, y1, y);
            }
            draw.segment(context, ix1, y, ix2, y, color);
        }
    },
};
