import { css } from 'lit-element';

export default css`
:host {
  display: inline-block;
  box-sizing: border-box; }

:host([hidden]), [hidden] {
  display: none !important; }

*, *:before, *:after {
  box-sizing: inherit;
  font-family: inherit; }

.grid {
  width: 70%; }

.container {
  display: flex;
  flex-direction: column; }

.filters {
  display: grid;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr); }
`;
