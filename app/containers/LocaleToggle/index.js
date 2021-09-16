/**
 *
 * LocaleToggle
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { compose } from "redux";

import messages from "./messages";
import { createSelector } from 'reselect';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { showInitials } from "../../utils/commonUtils";

/* eslint-disable react/prefer-stateless-function */
export class LocaleToggle extends React.Component {
    state = {
        logs: {
            en: { lan: "English", img: "unitedStates" },
            fr: { lan: "français", img: "france" },
            hi: { lan: "हिंदी", img: "india" }
        },
        intlStates: [
            {
                continent: "americas",
                subs: [
                    { Country: 'unitedStates', Language: 'English', value: 'en' }
                ]
            },
            {
                continent: "europe",
                subs: [
                    { Country: 'france', Language: 'français', value: 'fr' },
                    { Country: 'germany', Language: 'Deutsche', value: "de" },
                    { Country: 'russia', Language: 'русский', value: "ru" }
                ]
            },
            {
                continent: "asia",
                subs: [
                    { Country: 'india', Language: 'हिंदी', value: 'hi' },
                    { Country: 'china', Language: '中文', value: 'zh-Hans' },
                ]
            },
        ]
    }
    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-language dropdown-toggle" data-toggle="dropdown">
                    <img src={require(`../../assets/images/CountryFlags/${this.state.logs[this.props.locale].img}.png`)} />
                    {/* <span className="languageName">{showInitials(this.state.logs[this.props.locale].lan)}</span> */}
                    <i className="fas fa-caret-down"></i>
                </button>
                <div className="dropdown-menu">
                    <div className="dropdown-item">
                        <div className="languageSelector">
                            <h4><FormattedMessage {...messages.languagePreference} children={(message => message)} /></h4>
                            <ul className="continentList">
                                {this.state.intlStates.map((locale, index) => (
                                    <li key={locale.continent}>
                                        <h5><FormattedMessage {...messages[locale.continent]} children={(message => message)} /></h5>
                                        <ol>
                                            {locale.subs.length > 0 && locale.subs.map((sub, index) => (
                                                <li onClick={() => this.props.onLocaleToggle(sub.value)} key={sub.Country + index}
                                                    className={['germany', 'russia', 'china'].includes(sub.Country) ? "disabled" : ""}
                                                >
                                                    <img src={require(`../../assets/images/CountryFlags/${sub.Country}.png`)} />
                                                    <h6><FormattedMessage {...messages[sub.Country]} children={(message => message)} /></h6>
                                                    <p>{sub.Language}</p>
                                                </li>
                                            ))}
                                        </ol>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LocaleToggle.propTypes = {
    dispatch: PropTypes.func
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
    locale,
}));

export function mapDispatchToProps(dispatch) {
    return {
        onLocaleToggle: evt => dispatch(changeLocale(evt)),
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(withConnect)(LocaleToggle);
