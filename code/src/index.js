import React from "react";
import { Row, Col } from "antd";
import JsonTable from "./table";
import BarChart from "../components/bar-chart";
import Challenge from "./challenge";

const CodeTest = () => {
    return (
        <div styles={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24}>
                    <JsonTable />
                </Col>{" "}
                <Col xs={24} sm={24} md={12}>
                    <BarChart />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Challenge />
                </Col>
            </Row>
        </div>
    );
};

export default CodeTest;
