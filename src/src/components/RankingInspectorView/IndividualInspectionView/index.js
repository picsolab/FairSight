import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import ReactFauxDOM from 'react-faux-dom';
import { Table, Icon, Badge, Progress } from 'antd';

import styles from './styles.scss';
import index from '../../../index.css';
import gs from '../../../config/_variables.scss'; // gs (=global style)

class IndividualInspectionView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderFeatureTable() {
      const _self = this;
      const { selectedInstance } = this.props;
  
      return Object.keys(selectedInstance.features).map((feature, idx) => {
        return {
          feature: feature.replace(/_/g, ' '),
          value: selectedInstance.features[feature]
        };
      });
    }

    renderEmptyTable() {
      const { features } = this.props;

      return [
        {
          feature: features.map((d) => (<div>{d.name}</div>)),
          value: ''
        }
      ]
    }

    render() {
      console.log('IndividualInspectionView rendered');
      const { selectedInstance, rankingInstance } = this.props,
            { sensitiveAttr } = rankingInstance,
            { protectedGroup, nonProtectedGroup } = sensitiveAttr;
  
      const columns = [
        { title: 'Feature', dataIndex: 'feature', width: '65%' },
        { title: 'Value', dataIndex: 'value', width: '35%'}
      ];

      return (
        <div className={styles.IndividualInspectionView}>
          <div className={index.title + ' ' + styles.localInspectorTitle}>Local Inspector</div>
            <div className={styles.IndividualStatus}>
              <div className={styles.individualInspectionTitle}>Individual Inspection</div>
              {/* <Icon type="user" style={{ fontSize: 50, backgroundColor: 'white', border: '1px solid grey', marginBottom: 10}}/> */}
              <div>
                <Badge status="success"/>
                <span className={index.instanceIdTitle}>Instance ID:&nbsp;</span>
                {(selectedInstance && Object.keys(selectedInstance).length !== 0) ? selectedInstance.idx : ''}
              </div>
              <div className={styles.individualMeasures}>
                <Badge status="success"/>
                {'rNN: ' + Math.round(this.props.xNN * 100) / 100}
              </div>
              <div className={styles.individualMeasures}>
                <Badge status="success"/>
                {'rNN (gain): ' + Math.round(this.props.xNN * 100) / 100}
              </div>
              <div className={styles.instanceDataTableWrapper}>
                <Table
                  className={styles.instanceDataTable}
                  columns={columns} 
                  dataSource={ (selectedInstance && Object.keys(selectedInstance).length !== 0) ? this.renderFeatureTable() : this.renderEmptyTable() } 
                  scroll={{ y: 120 }}
                  pagination={false}
                  bordered
                />
              </div>
            </div>
            <p></p>
        </div>
      );
    }
}

export default IndividualInspectionView;