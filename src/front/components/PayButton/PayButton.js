/* @flow */

import * as React from 'react'
import { compose, defaultProps } from 'recompose'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

import * as actions from '../../../actions'
import * as store from '../../../front/store/reducers'
import * as selectors from '../../../front/selectors'

export const PayButton = compose(
  (connect(
    (state: store.State) => ({
      currentOrderId: selectors.getMyOrderId(state),
      isReadyToPay: selectors.isReadyToPay(state),
      isInPayTransaction: selectors.isInPayTransaction(state),
    }),
    dispatch => ({
      cancelOrder: () => compose(dispatch, actions.orderPay),
    }),
    ({ currentOrderId }, { cancelOrder, isInPayTransaction }) => ({
      children: isInPayTransaction ? (
        <React.Fragment>
          <CircularProgress />
          Оплатить
        </React.Fragment>
      ) : (
        'Оплатить'
      ),
      disabled: isInPayTransaction,
      onClick: currentOrderId && (() => cancelOrder(currentOrderId)),
    }),
  ): any),
  defaultProps({
    children: 'Оплатить',
    variant: 'raised',
    type: 'primary',
  }),
)(({ isReadyToPay, ...props }) => (isReadyToPay ? <Button {...props} /> : null))
