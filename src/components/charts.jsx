import { B } from '../theme.js';

export function BarChart({ data, labels, height = 110, highlightIdx = null, color = B.navyLight, highlightColor = B.green }) {
    const max = Math.max(...data);
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height, padding: "0 2px" }}>
            {data.map((v, i) => {
                const pct = Math.round((v / max) * (height - 20));
                const isH = highlightIdx !== null ? i === highlightIdx : false;
                return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <div style={{
                            width: "100%", height: pct, borderRadius: "4px 4px 0 0", minHeight: 4,
                            background: isH ? highlightColor : color,
                            border: `1px solid ${isH ? highlightColor : B.navyMid + "33"}`,
                            position: "relative"
                        }}>
                            {isH && (
                                <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: highlightColor, color: B.white, fontSize: 9, fontWeight: 500, padding: "1px 5px", borderRadius: 3, whiteSpace: "nowrap" }}>
                                    {v >= 1000 ? `₹${Math.round(v / 1000)}k` : v}
                                </div>
                            )}
                        </div>
                        <span style={{ fontSize: 10, color: isH ? highlightColor : B.textMuted, fontWeight: isH ? 500 : 400 }}>{labels[i]}</span>
                    </div>
                );
            })}
        </div>
    );
}

export function DonutChart({ segments, size = 100 }) {
    const total = segments.reduce((s, x) => s + x.value, 0);
    let cumulative = 0;
    const cx = size / 2, cy = size / 2, r = size * 0.38, strokeW = size * 0.16;
    const circumference = 2 * Math.PI * r;
    const paths = segments.map((seg, i) => {
        const dashArray = (seg.value / total) * circumference;
        const dashOffset = circumference - cumulative * circumference / total;
        cumulative += seg.value;
        return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                stroke={seg.color} strokeWidth={strokeW}
                strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                strokeDashoffset={dashOffset}
                style={{ transform: `rotate(-90deg)`, transformOrigin: "50% 50%" }}
            />
        );
    });
    return <svg width={size} height={size}>{paths}</svg>;
}

export function ProgressBar({ value, color = B.green, height = 6 }) {
    const pct = Math.min(100, parseInt(value));
    const c = pct > 90 ? B.red : pct > 60 ? B.amber : color;
    return (
        <div style={{ background: B.border, borderRadius: 10, height, overflow: "hidden", minWidth: 60 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: c, borderRadius: 10, transition: "width .3s" }} />
        </div>
    );
}
