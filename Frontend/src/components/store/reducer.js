import * as actionTypes from './actions';

const initialState ={
	userInfo:null,
	check:0,
	slots:null,
	rfp:null,
	CentreValue:null,
	centreList:null,
	testInfo:null,
	centerInfo:null,
	bookInfo:null,
	loading:false
}

const reducer = (state = initialState,action) =>{
	switch (action.type) {
		case actionTypes.CHANGE_STATE:
		{
			// console.log("userInfo edited")
			return{
				...state,
				userInfo:action.userInfo
			}
		}
		case actionTypes.CHANGE_CHECK:
		{
			// console.log("check edited")
			return{
				...state,
				check:action.check
			}
		}
		case actionTypes.CHANGE_CENTRELIST:
		{
			// console.log("centreList edited")
			return{
				...state,
				centreList:action.centreList
			}
		}
		case actionTypes.CHANGE_CENTREVALUE:
		{
			// console.log("CentreValue edited")
			return{
				...state,
				CentreValue:action.CentreValue
			}
		}
		case actionTypes.CHANGE_SLOTS:
		{
			// console.log("slots edited")
			return{
				...state,
				slots:action.slots
			}
		}
		case actionTypes.CHANGE_RFP:
		{
			console.log("rfp edited")
			return{
				...state,
				rfp:action.rfp
			}
		}
		case actionTypes.CHANGE_TESTINFO:
		{
			// console.log("testInfo edited")
			return{
				...state,
				testInfo:action.testInfo
			}
		}
		case actionTypes.CHANGE_CENTERINFO:
		{
			// console.log("CenterInfo edited")
			return{
				...state,
				centerInfo:action.centerInfo
			}
		}
		case actionTypes.CHANGE_BOOKINFO:
		{
			// console.log("BookInfo edited")
			return{
				...state,
				bookInfo:action.bookInfo
			}
		}
		case actionTypes.CHANGE_LOADING:
		{
			// console.log("Loading edited")
			return{
				...state,
				loading:action.loading
			}
		}
	}
	return state;
};

export default reducer;