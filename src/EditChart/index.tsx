import React from "react";
import { Button, CheckboxProps, Form, Header, InputOnChangeData, Segment } from "semantic-ui-react";
import NivoPieChart from "../Nivo/NivoPieChart";
import { LegendProps, LegendAnchor, LegendDirection } from "@nivo/legends";

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

interface IState {
    title: string;
    innerRadius: number;
    padAngle: number;
    cornerRadius: number;
    radialLabels: boolean;
    legends: LegendProps[];
}

const legend: LegendProps = {
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
}

const initialState: IState = {
    title: "",
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,
    radialLabels: true,
    legends: [legend]
}

export default function Grid() {
    const [state, setState] = React.useState<IState>(initialState);

    function handleOnChangeInput(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        setState(state => ({ ...state, [data.name]: data.value }));
    }
    function handleOnChangeCheckbox(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        setState(state => ({ ...state, [data.name as string]: data.checked }));
    }
    function handleOnChangeInputLegend(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        let legend: LegendProps = JSON.parse(JSON.stringify(state.legends[0]));
        legend = { ...legend, [data.name]: parseInt(data.value) };
        setState(state => ({ ...state, legends: [legend] }));
    }
    function handleOnChangeRadioLegend(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        let legend: LegendProps = JSON.parse(JSON.stringify(state.legends[0]));
        legend = { ...legend, anchor: data.value as LegendAnchor };
        setState(state => ({ ...state, legends: [legend] }));
    }
    function handleChangeDirection(direction: LegendDirection) {
        let legend: LegendProps = JSON.parse(JSON.stringify(state.legends[0]));
        legend = { ...legend, direction: direction };
        setState(state => ({ ...state, legends: [legend] }));
    }
    function handleOnChangeActiveLegend(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        if (data.checked) {
            setState(state => ({ ...state, legends: [legend] }));
        } else {
            setState(state => ({ ...state, legends: [] }));
        }
    }

    return (
        <div className="wrapper">
            <div className="navbar" />
            <div className="container">
                <Segment id="margin-right" className="full-height options">
                    <Header content="Opções do gráfico" />
                    <Form>
                        <Form.Input
                            fluid
                            label="Título do gráfico"
                            placeholder="Título"
                            name="title"
                            value={state.title}
                            onChange={handleOnChangeInput}
                        />
                        <Form.Input
                            label="Raio interno"
                            min={0}
                            max={1}
                            name="innerRadius"
                            onChange={handleOnChangeInput}
                            step={0.05}
                            type="range"
                            value={state.innerRadius}
                        />
                        <Form.Input
                            label="Espaçamento"
                            min={0}
                            max={45}
                            name="padAngle"
                            onChange={handleOnChangeInput}
                            step={1}
                            type="range"
                            value={state.padAngle}
                        />
                        <Form.Input
                            label="Raio dos cantos"
                            min={0}
                            max={45}
                            name="cornerRadius"
                            onChange={handleOnChangeInput}
                            step={1}
                            type="range"
                            value={state.cornerRadius}
                        />
                        <Form.Checkbox
                            toggle
                            label="Legendas nos raios"
                            name="radialLabels"
                            checked={state.radialLabels}
                            onChange={handleOnChangeCheckbox}
                        />
                        <Header content="Legenda" />
                        <Form.Checkbox
                            toggle
                            label="Ativa"
                            name="activeLegend"
                            checked={state.legends.length > 0}
                            onChange={handleOnChangeActiveLegend}
                        />
                        {state.legends.length > 0 &&
                            <>
                                <Form.Field>
                                    <label>Orientação</label>
                                    <Button.Group fluid>
                                        <Button
                                            content="Vertical"
                                            color={state.legends[0].direction === "column" ? "blue" : undefined}
                                            onClick={() => handleChangeDirection("column")}
                                        />
                                        <Button
                                            content="Horizontal"
                                            color={state.legends[0].direction === "row" ? "blue" : undefined}
                                            onClick={() => handleChangeDirection("row")}
                                        />
                                    </Button.Group>
                                </Form.Field>
                                <Form.Input
                                    label="Alinhar horizontal"
                                    min={-500}
                                    max={500}
                                    name="translateX"
                                    onChange={handleOnChangeInputLegend}
                                    step={1}
                                    type="range"
                                    value={state.legends[0].translateX}
                                />
                                <Form.Input
                                    label="Alinhar vertical"
                                    min={-500}
                                    max={500}
                                    name="translateY"
                                    onChange={handleOnChangeInputLegend}
                                    step={1}
                                    type="range"
                                    value={state.legends[0].translateY}
                                />
                                <Form.Field>
                                    <label>Posição</label>
                                </Form.Field>
                                <Form.Group widths="equal">
                                    <Form.Radio
                                        label="Topo-esquerda"
                                        name="anchor"
                                        value="top-left"
                                        checked={state.legends[0].anchor === "top-left"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Topo"
                                        name="anchor"
                                        value="top"
                                        checked={state.legends[0].anchor === "top"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Topo-direita"
                                        name="anchor"
                                        value="top-right"
                                        checked={state.legends[0].anchor === "top-right"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Radio
                                        label="Esquerda"
                                        name="anchor"
                                        value="left"
                                        checked={state.legends[0].anchor === "left"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Centro"
                                        name="anchor"
                                        value="center"
                                        checked={state.legends[0].anchor === "center"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Direita"
                                        name="anchor"
                                        value="right"
                                        checked={state.legends[0].anchor === "right"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Radio
                                        label="Baixo-esquerda"
                                        name="anchor"
                                        value="bottom-left"
                                        checked={state.legends[0].anchor === "bottom-left"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Baixo"
                                        name="anchor"
                                        value="bottom"
                                        checked={state.legends[0].anchor === "bottom"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                    <Form.Radio
                                        label="Baixo-direita"
                                        name="anchor"
                                        value="bottom-right"
                                        checked={state.legends[0].anchor === "bottom-right"}
                                        onChange={handleOnChangeRadioLegend}
                                    />
                                </Form.Group>
                            </>
                        }
                    </Form>
                </Segment>
                <Segment id="no-margin-top" className="auto">
                    <Header content={state.title || "Titulo do gráfico"} />
                    <div className="auto padding">
                        <NivoPieChart
                            data={data}
                            innerRadius={state.innerRadius}
                            padAngle={state.padAngle}
                            cornerRadius={state.cornerRadius}
                            radialLabels={state.radialLabels}
                            legends={state.legends}
                        />
                    </div>
                </Segment>

            </div>
        </div>
    )
}