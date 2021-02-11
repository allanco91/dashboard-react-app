import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Card, Header, Segment } from "semantic-ui-react";
import AreaChart from "../Charts/AreaChart";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import RadarChart from "../Charts/RadarChart";
import NivoPieChart from "../Nivo/NivoPieChart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getFromLS(key: any) {
    let ls: any = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8") || "") || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key: string, value: ReactGridLayout.Layouts) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}

const data = [
    {
        "id": "stylus",
        "label": "stylus",
        "value": 130,
        "color": "hsl(78, 70%, 50%)"
    },
    {
        "id": "erlang",
        "label": "erlang",
        "value": 295,
        "color": "hsl(353, 70%, 50%)"
    },
    {
        "id": "css",
        "label": "css",
        "value": 235,
        "color": "hsl(44, 70%, 50%)"
    },
    {
        "id": "make",
        "label": "make",
        "value": 252,
        "color": "hsl(53, 70%, 50%)"
    },
    {
        "id": "java",
        "label": "java",
        "value": 66,
        "color": "hsl(298, 70%, 50%)"
    }
]

export default function Grid() {
    // const layout: GridLayout.Layout[] = [
    //     { i: "a", x: 0, y: 0, w: 1, h: 2 },
    //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    //     { i: "c", x: 4, y: 0, w: 1, h: 2 },
    // ];

    const [state, setState] = React.useState<{ layouts: ReactGridLayout.Layouts }>({
        layouts: {

        }
    });

    function onLayoutChange(layout: ReactGridLayout.Layout[], layouts: ReactGridLayout.Layouts) {
        saveToLS("layouts", layouts);
        setState({ layouts });
    }

    return (
        <>
            <div className="navbar" />
            <div className="container">
                <div className="padding-sides grid">
                    <ResponsiveReactGridLayout
                        className="ui cards fluid"
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        verticalCompact={false}
                        rowHeight={30}
                        layouts={state.layouts}
                        onLayoutChange={(layout, layouts) =>
                            onLayoutChange(layout, layouts)
                        }
                    >
                        <Card key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                            <LineChart />
                        </Card>
                        <Card key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <AreaChart />
                        </Card>
                        <Card key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
                            <BarChart />
                        </Card>
                        <Card key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
                            <PieChart />
                        </Card>
                        <Card key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
                            <RadarChart />
                        </Card>
                        <Card key="6" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
                            <NivoPieChart
                                data={data}
                                innerRadius={0}
                                padAngle={0.7}
                                cornerRadius={3}
                                radialLabels={true}
                                legends={[{
                                    anchor: "bottom",
                                    direction: "row",
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: "#999",
                                    itemDirection: "left-to-right",
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: "circle",
                                    effects: [
                                        {
                                            on: "hover",
                                            style: {
                                                itemTextColor: "#000"
                                            }
                                        }
                                    ]
                                }]}
                            />
                        </Card>
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        </>
    )
}