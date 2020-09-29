import { ResponsivePie } from '@nivo/pie'

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAssets } from "../../../actions/assetActions";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

class Pie extends Component {
    
    componentDidMount() {
        this.props.getAssets();
    }

    render() {
        const {assets} = this.props.assets
        let activos = Object.values(assets.data)
        let data = activos.reduce((r, a) => {
            console.log("a", a);
            console.log('r', r);
            r[a.categoria] = [...r[a.categoria] || [], a];
            return r;
        }, {});
        const temp = Object.keys(data)
        const aux = Object.values(data)
        let cuenta = []
        for(let i=0;i<temp.length;i++) {
            console.log(temp[i]+": "+aux[i].length)
            cuenta.push({id: temp[i], value: aux[i].length})
        }

        return(
                <ResponsivePie
                    data={cuenta}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(255, 255, 255, 0.3)',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[]}
                    legends={[]}
                />
        )
    }

}

Pie.propTypes = {
    assets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(
    mapStateToProps,
    { getAssets }
)(Pie);