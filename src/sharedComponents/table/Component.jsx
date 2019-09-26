import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styled from 'styled-components';

const Table = props => {
  const { headers, rows, rowClickHandler, rowIdentifierKey } = props;

  const TableBackground = styled.div`
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    margin: 15px 25px;
  `;

  const TableHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 30px;

    font-size: 10px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-transform: uppercase;
    color: ${props => props.theme.colors.titlePrimary};
  `;

  const HeaderCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => parseInt(100 / props.headersLength) + '%'};
    min-width: 100px;
    height: 40px;
  `;

  const backgroundColor = props =>
    props.evenRow % 2 ? 'white' : props.theme.colors.backgroundLightTertiary;

  const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0 30px;
    background-color: ${backgroundColor};
    cursor: pointer;

    font-size: 14px;

    &:hover {
      background-color: ${props => props.theme.colors.tableHoverPrimary};
    }
  `;

  const TableCell = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: ${props => parseInt(100 / props.rowLength) + '%'};
    min-width: 100px;
    height: 50px;

    font-family: SuisseIntl-Thin;
    font-size: 16px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${props => props.theme.colors.textTertiary};
    overflow-x: auto;
    border-width: 0 1px 0 0;
    border-style: solid;
    border-color: #929292;
  `;

  const headersLength = props.headers.length;

  return (
    <TableBackground>
      <TableHeader>
        {headers.map((header, index) => {
          return (
            <HeaderCell headersLength={headersLength} key={index}>
              {header[1]}
            </HeaderCell>
          );
        })}
      </TableHeader>
      {rows.map((row, index) => {
        const identifier = _.get(row, rowIdentifierKey);

        return (
          <TableRow
            key={index}
            evenRow={index}
            onClick={() => rowClickHandler(identifier)}
          >
            {headers.map((headerDescriptor, index) => {
              return (
                <TableCell rowLength={headersLength} key={index}>
                  {row[headerDescriptor[0]]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBackground>
  );
};

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowClickHandler: PropTypes.func,
  rowIdentifierKey: PropTypes.string,
  cellsToHide: PropTypes.array,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      backgroundLightTertiary: PropTypes.string.isRequired,
      tableHoverPrimary: PropTypes.string.isRequired,
      textTertiary: PropTypes.string.isRequired,
      titlePrimary: PropTypes.string.isRequired,
    }),
  }),
  rowLength: PropTypes.number,
  evenRow: PropTypes.number,
  headersLength: PropTypes.number,
};

export default Table;
