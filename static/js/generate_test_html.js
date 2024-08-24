export function generateTestHTML(element, index) {
  if (!element.test) return '';

  return `
    <div class="container mt-4">
      <div id="test-${index}" class="test-section" style="display: none;">
        <div class="card custom-card wide-card">
          <div class="card-header">
            <h3>${element.test.title}</h3>
          </div>
          <div class="card-body">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="test-${index}" id="variant1-${index}" value="${element.test.variant_1}">
              <label class="form-check-label" for="variant1-${index}">
                ${element.test.variant_1}
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="test-${index}" id="variant2-${index}" value="${element.test.variant_2}">
              <label class="form-check-label" for="variant2-${index}">
                ${element.test.variant_2}
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="test-${index}" id="variant3-${index}" value="${element.test.variant_3}">
              <label class="form-check-label" for="variant3-${index}">
                ${element.test.variant_3}
              </label>
            </div>
            <p class="test-result mt-3" style="display: none;"></p>
          </div>
        </div>
      </div>
    </div>
  `;
}