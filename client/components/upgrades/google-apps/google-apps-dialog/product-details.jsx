/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { localize } from 'i18n-calypso';

class GoogleAppsProductDetails extends Component {
	static propTypes = {
		annualPrice: PropTypes.string.isRequired,
		monthlyPrice: PropTypes.string.isRequired,
		showDiscount: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		showDiscount: false,
	};

	renderPrice() {
		const { translate } = this.props;

		if ( this.props.showDiscount ) {
			return (
				<Fragment>
					<del>
						{ translate( '%(monthlyPrice)s per user / month', {
							args: { monthlyPrice: this.props.monthlyPrice },
						} ) }
					</del>
					<strong>
						{ /* Do not translate this string as it is a part of an abtest. */ }
						{ this.props.discountMonthlyPrice } per user / month
					</strong>
				</Fragment>
			);
		}

		return translate( '%(monthlyPrice)s per user / month', {
			args: { monthlyPrice: this.props.monthlyPrice },
		} );
	}

	// Do not translate this function as it is a part of an abtest.
	renderPromotionalCopy() {
		if ( ! this.props.showDiscount ) {
			return null;
		}

		return (
			<h5 className="google-apps-dialog__promotional-copy">
				LIMITED-TIME ONLY: { this.props.discountAnnualPrice } FOR THE FIRST YEAR
				<span className="google-apps-dialog__promotional-copy-percent">42% OFF</span>
			</h5>
		);
	}

	renderPeriod() {
		if ( this.props.showDiscount ) {
			// Do not translate this string as it is a part of an abtest.
			return `${ this.props.annualPrice } Billed yearly`;
		}

		return this.props.translate( '%(annualPrice)s Billed yearly — get 2 months free!', {
			args: { annualPrice: this.props.annualPrice },
		} );
	}

	render() {
		const { translate, showDiscount } = this.props;

		return (
			<div
				className={ classnames( 'google-apps-dialog__product-details', {
					'with-discount': showDiscount,
				} ) }
			>
				<div className="google-apps-dialog__product-intro">
					<h3 className="google-apps-dialog__product-name">
						{ /* Intentionally not translable as it is a brand name and Google keeps it in English */ }
						<span className="google-apps-dialog__product-logo">G Suite</span>
					</h3>

					<p>
						{ translate(
							"We've teamed up with Google to offer you email, storage, docs, calendars, " +
								'and more, integrated with your site.'
						) }
					</p>

					<h4 className="google-apps-dialog__price-per-user">{ this.renderPrice() }</h4>

					<h5 className="google-apps-dialog__billing-period">{ this.renderPeriod() }</h5>

					{ this.renderPromotionalCopy() }
				</div>

				<div className="google-apps-dialog__product-features">
					<h5 className="google-apps-dialog__product-feature">
						<img src="/calypso/images/g-suite/logo_gmail_48dp.svg" />
						<p>
							{ translate( 'Professional email {{nowrap}}(@%(domain)s){{/nowrap}}', {
								args: { domain: this.props.domain },
								components: { nowrap: <span className="google-apps-dialog__domain" /> },
							} ) }
						</p>
					</h5>

					<h5 className="google-apps-dialog__product-feature">
						<img src="/calypso/images/g-suite/logo_drive_48dp.svg" />
						<p>{ translate( '30GB Online File Storage' ) }</p>
					</h5>

					<h5 className="google-apps-dialog__product-feature">
						<img src="/calypso/images/g-suite/logo_docs_48dp.svg" />
						<p>{ translate( 'Docs, spreadsheets, and more' ) }</p>
					</h5>

					<h5 className="google-apps-dialog__product-feature">
						<img src="/calypso/images/g-suite/logo_hangouts_48px.png" />
						<p>{ translate( 'Video and voice calls' ) }</p>
					</h5>
				</div>
			</div>
		);
	}
}

export default localize( GoogleAppsProductDetails );
