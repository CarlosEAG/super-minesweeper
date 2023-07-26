const one = {
	backgroundColor: '#290080',
}
const two = {
	backgroundColor:'#800075',
}
const three = {
	backgroundColor:'#c7036f',
}
const four = {
	backgroundColor:'#db0a2d',
}
const five = {
	backgroundColor:'#a50215',
}

const flagged = {
	backgroundColor:'#ff8122',
    boxShadow: '0px 0px 10px #fff,0px 0px 30px #ff8122',
}
const mineFlagged = {
	backgroundColor:'#840017',
    boxShadow: '0px 0px 10px #fff,0px 0px 30px #840017',
}
const wrongFlag = {
    backgroundColor:'#ff8122',
    boxShadow: '0px 0px 10px #fff,0px 0px 30px #ff8122',
}
const covered = {
    backgroundColor:'black',
};
const empty = {
    backgroundColor:'lightgrey',
    boxShadow: '0px 0px 2px #fff,0px 0px 30px lightgrey',
};
const mined = {
	backgroundColor: 'red',
    boxShadow: '0px 0px 2px #fff,0px 0px 30px red',
}

export const cellStyles = {
    covered,
    empty,
    one,
    two,
    three,
    four,
    five,
    flagged,
    mined,
    mineFlagged,
    wrongFlag,
}

export type cellStylesType = keyof typeof cellStyles;
