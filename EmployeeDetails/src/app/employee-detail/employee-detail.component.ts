import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {
  employees!: any[];
  constructor() {
  }

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
    console.log(this.employees);
  }

  ngAfterViewInit(): void {
    this.setupCheckbox();
    this.setupSearchBox();
    this.setupCalculateButton();
  }

  // checkbox and delete option
  setupCheckbox(): void {
    const optionAll = document.getElementById('option-all') as HTMLInputElement;
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');

    optionAll.addEventListener('click', () => {
      checkboxes.forEach((checkbox: any, index: number) => {
        if (index !== 0) {
          (checkbox as HTMLInputElement).checked = optionAll.checked;
          const row = checkbox.closest('tr');
          if (optionAll.checked) {
            row.classList.add('selected');
          } else {
            row.classList.remove('selected');
          }
        }
      });
    });

    checkboxes.forEach((checkbox: any, index: number) => {
      checkbox.id = `checkbox-${index}`;
      checkbox.addEventListener('click', () => {
        const row = checkbox.closest('tr');
        const employee = this.employees[index];

        if (checkbox.checked) {
          row.classList.add('selected');
        } else {
          row.classList.remove('selected');
        }
      });
    });

    const deleteButton = document.getElementById('delete-button');
    deleteButton!.addEventListener('click', () => {
      const selectedRows = document.querySelectorAll('table tr.selected');
      selectedRows.forEach((row: any) => {
        if (!row.classList.contains('header-row')) {
          const index = Array.from(row.parentNode.children).indexOf(row) - 0;
          this.employees.splice(index, 1); // index is starting index and 1 is number of element
          localStorage.setItem('employees', JSON.stringify(this.employees));
          row.remove();
        }
      });
    });
  }
  //.............................................................................

  setupSearchBox(): void {
    const searchBox = document.getElementById('searchBox') as HTMLInputElement;
    const table = document.getElementById('employeeTable');
    const rows = table!.querySelectorAll('tr');
    const headerRow = rows[0];

    searchBox.addEventListener('input', () => {
      const query = searchBox.value.toLowerCase();
      rows.forEach((row: HTMLElement, rowIndex: number) => {
        if (rowIndex === 0) return; // Skip the header row
        let rowMatch = false;
        row.querySelectorAll('td').forEach((cell: HTMLElement, cellIndex: number) => {
          if (cellIndex === 0) return; // Skip the first column
          const content = cell.textContent!.toLowerCase();
          if (content.includes(query)) {
            rowMatch = true;
            const regex = new RegExp(query, 'gi');
            const newContent = content.replace(regex, '<span class="highlight">$&</span>');
            cell.innerHTML = newContent;
          } else {
            cell.innerHTML = content;
          }
        });
        if (rowMatch) {
          row.classList.add('matched');
        } else {
          row.classList.remove('matched');
        }
      });

      // Hide non-matching rows
      const matchingRows = table!.querySelectorAll('tr.matched');
      const nonMatchingRows = table!.querySelectorAll('tr:not(.matched)');
      for (let i = 1; i < nonMatchingRows.length; i++) {
        (nonMatchingRows[i] as HTMLElement).style.display = 'none';
      }
      matchingRows.forEach((row: any) => {
        row.style.display = 'table-row';
      });
    });
  }
  //................................................................................

  setupCalculateButton(): void {
    //For assigning unique id for each checkbox and also for adding blank-space for avg and max 
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
    checkboxes.forEach((checkbox: any, index: number) => {
      checkbox.id = `checkbox-${index}`;
      // console.log(checkbox.id);

      checkbox.addEventListener('click', () => {
        const averageSpan = document.getElementById('average');
        const maximumSpan = document.getElementById('maximum');
        averageSpan!.innerText = '';
        maximumSpan!.innerText = '';
      });
    });

    const calculateBtn = document.getElementById('calculateBtn');
    const averageSpan = document.getElementById('average');
    const maximumSpan = document.getElementById('maximum');

    calculateBtn!.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
      const checkedEmployees: any = [];
      checkboxes.forEach((checkbox, index) => {
        if ((checkbox as HTMLInputElement).checked && index > 0) { // Exclude first row
          const row = checkbox.closest('tr');
          const score = parseInt(row!.cells[2].textContent!, 10);
          checkedEmployees.push(score);
        }
      });

      if (checkedEmployees.length > 0) {
        const totalScore = checkedEmployees.reduce((acc: any, curr: any) => acc + curr);
        const averageScore = totalScore / checkedEmployees.length;
        const maximumScore = Math.max(...checkedEmployees);

        averageSpan!.textContent = averageScore.toFixed(2);
        maximumSpan!.textContent = maximumScore.toString();
      } else {
        alert('Please select at least one employee to calculate the average and maximum score.');
      }
    });
  }


}
