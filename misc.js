.customSteperMobileStyle {
  width: 100%;
  span {
    height: 23px !important;
  }
  .MuiStepLabel-root {
    padding: 2px 12px !important;
    width: inherit;
  }
  .MuiStepLabel-labelContainer {
    width: max-content;
    // width: 100%;
  }
  .MuiStepLabel-label {
    display: flex;
    align-items: center;
  }
}

.stepper-box-wrapper {
  // @include Stepper-Mobile;
  // position: fixed;
  // width: 100%;
  // position: sticky;
  // top: 0;
  padding: 0 !important;

  .MuiStepConnector-root {
    display: none;
  }
  .skipped-section {
    background: #dda034 !important;
    border-radius: 32px !important;
    .MuiStepLabel-label {
      // color: #ffffff !important;
    }
  }
  .MuiStepLabel-iconContainer {
    display: none;
  }
  .MuiStepLabel-root {
    padding:  2px 20px 2px 20px;
    width: 240px;
    height: 28px;
    background: #0071eb;
    border-radius: 0px 32px 32px 0px;
  }
  .Mui-completed {
    color: #97c6f7 !important;
  }
  .MuiStepLabel-root:has(> .Mui-completed) {
    background: #0071eb;
    border-radius: 0px;
  }
  .Mui-disabled {
    background: #f3f3f3;
    border-radius: 0px;
    color: rgba(0, 0, 0, 0.6);
  }
  .MuiStepLabel-label {
    font-weight: 700 !important;
    display: flex;
    justify-content: space-around;
    height: 28px;
    align-items: center;
  }
  .Mui-active {
    color: #ffffff !important;
  }
}
