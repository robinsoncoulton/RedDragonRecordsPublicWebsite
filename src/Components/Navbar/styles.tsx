import styled from 'styled-components'

export const StyledNav = styled.div`
    display: flex;
    a {
        margin-right: 5px;
        text-decoration: none;
        font-family: MyFont2;
        font-size: 16pt;
        padding-bottom: 10px;
        height: min-content;
        color: black;

        &:hover {
            border-bottom: 3px solid black;
        }
    }
`